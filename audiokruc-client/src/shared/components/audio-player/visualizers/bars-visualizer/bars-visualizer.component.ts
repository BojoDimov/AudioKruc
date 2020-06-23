import { Component, AfterViewInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ak-bars-visualizer',
  templateUrl: './bars-visualizer.component.html',
  styles: []
})
export class BarsVisualizerComponent implements AfterViewInit, OnDestroy {
  @Input('audioData')
  audioData$: Observable<any>;
  audioDataSubscription: Subscription;

  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null = null;

  spacerWidth: number = 2;
  maxHeightPercentage = 0.8;
  minHeightPercentage = 0.1;

  startColor: Color = new Color(255, 173, 97);
  endColor: Color = new Color(195, 243, 98);

  bars: Rectangle[] = [];

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.audioDataSubscription = this.audioData$.subscribe(data => {
      this.bars = this.createBars(data);
    });

    if (this.ctx != null) {
      window.requestAnimationFrame(this.drawToCanvas);
    }
  }

  ngOnDestroy() {
    if (this.audioDataSubscription) {
      this.audioDataSubscription.unsubscribe();
    }
  }

  drawToCanvas = () => {
    if (!this.ctx) {
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    if (!this.bars.length) {
      window.requestAnimationFrame(this.drawToCanvas);
      return;
    }

    this.bars.filter(e => e).forEach(({ color, x, y, height, width }) => {
      this.ctx.fillStyle = rgbToHex(color.r, color.g, color.b);
      this.ctx.fillRect(x, y, width, height);
      this.ctx.strokeRect(x, y, width, height);
    });

    window.requestAnimationFrame(this.drawToCanvas);
  }

  createBars(data: Uint8Array): Rectangle[] {
    let binCount = data.length;

    let result = Array.prototype.slice.call(data).map((freq: number, i: number) => {
      let color = new Color(
        Math.round(this.startColor.r + i / binCount * (this.endColor.r - this.startColor.r)),
        Math.round(this.startColor.g + i / binCount * (this.endColor.g - this.startColor.g)),
        Math.round(this.startColor.b + i / binCount * (this.endColor.b - this.startColor.b))
      );

      let oldHeight = (this.bars[i] || { height: 0 }).height;
      let newHeight = this.minHeightPercentage * this.canvas.nativeElement.height +
        Math.max(freq, 0) * (this.maxHeightPercentage - this.minHeightPercentage) * this.canvas.nativeElement.height;

      //let height = Math.min(oldHeight, newHeight) + Math.abs(oldHeight - newHeight) / 2;
      let height = newHeight;
      let width = (this.canvas.nativeElement.width - (binCount - 1) * this.spacerWidth) / binCount;

      let x = i * (width + this.spacerWidth);
      let y = this.canvas.nativeElement.height - height;

      return <Rectangle>{ color, x, y, width, height };
    });
    return result;
  }
}

class Rectangle {
  color: Color;
  x: number;
  y: number;
  width: number;
  height: number;
}

class Color {
  constructor(public r: number, public g: number, public b: number) { }
}

function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
