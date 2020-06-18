import { Subject, Observable, timer } from "rxjs";
import { map, filter } from 'rxjs/operators';

class AkNode {
  isConnected = false;
  input = new Subject<any>();
  output = new Subject<any>();
  computation: any;

  constructor() {
    this.input.subscribe(data => {
      if (this.computation)
        this.output.next(this.computation(data))
    });
  }

  connect(node: AkNode): AkNode {
    this.output.subscribe(data => node.input.next(data));
    this.isConnected = true;
    return node;
  }
}

class AkSourceNode extends AkNode {
  fps = 24;

  constructor(analyserNode: AnalyserNode) {
    super();
    timer(0, 1000 / this.fps)
      .pipe(
        filter(_ => this.isConnected && !!analyserNode),
        map(_ => {
          let data = new Float32Array(analyserNode.frequencyBinCount);
          analyserNode.getFloatFrequencyData(data);
          return data;
        }))
      .subscribe(data => this.input.next(data));
  }
}

class AkCircleNode extends AkNode {
  center = [400, 300];
  radius = 250;
  resolution = 400;

  computation = (e, i) => [
    this.center[0] + this.radius * Math.cos(2 * Math.PI * e / this.resolution),
    this.center[1] + this.radius * Math.sin(2 * Math.PI * e / this.resolution)
  ];
}

class AkSineWaveNode extends AkNode {
  delta: number;
  resolution: number;
  phase: number;
  k: number;
  w: number;

  computation = (e, i) => [
    e[0] + this.delta * Math.sin(this.k * i + this.w * i + this.phase),
    e[1] + this.delta * Math.sin(this.k * i + this.w * i + this.phase),
  ];
}

let source = new AkSourceNode(null);
let circle = new AkCircleNode();
let sine = new AkSineWaveNode();

source.connect(circle).connect(sine);