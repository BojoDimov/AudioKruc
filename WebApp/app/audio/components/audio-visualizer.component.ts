import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { PlayerService } from '../../infrastructure/infrastructure.barrel';

@Component({
  selector: 'audio-visualizer',
  templateUrl: 'audio-visualizer.component.html'
})
export class AudioVisualizerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('audioCanvas') canvasRef: ElementRef

  height = 200;
  width = 600;
  barWidth = 92.70 / 2; //half of the golden ratio
  barHeight = 150;
  barCount = 0;

  offset = 0;//.01;
  dataRefreshRate = 60;
  dataContainer: Uint8Array;
  dataInterval = null;

  constructor(public player: PlayerService) {
    this.barCount = Math.ceil(this.width / this.barWidth);
    //this.dataContainer = new Uint8Array(this.player.analyzer.frequencyBinCount); //- some of the high frequencies are off so i sliced the array a little
    this.dataContainer = new Uint8Array(450);
    this.dataInterval = setInterval(() => {
      // this.player.analyzer.getByteTimeDomainData(this.dataContainer);
      this.player.analyzer.getByteFrequencyData(this.dataContainer);
    }, this.dataRefreshRate);
  }

  ngAfterViewInit() {
    this.drawLoop();
  }

  ngOnDestroy() {
    clearInterval(this.dataInterval);
  }

  drawLoop() {
    this.draw();
    requestAnimationFrame(this.drawLoop.bind(this));
  }

  getBarScaling() {
    let interval = Math.ceil(this.dataContainer.byteLength / this.barCount);
    let counter = -1;
    let { min, max } = this.minMax(this.dataContainer);
    let res = [];
    this.dataContainer.forEach(val => {
      if (++counter % interval == 0) {
        //let computed = (val - min + this.offset) / (max - min);
        let computed = val / 200 + this.offset;
        if (isNaN(computed))
          res.push(0);
        else res.push(computed * this.barHeight);
      }
    });
    return res;
  }

  minMax(data: Uint8Array): { min: number, max: number } {
    let min = 255, max = 1;
    data.forEach(val => {
      if (val > max)
        max = val;
      if (val < min)
        min = val;
    });
    return { min, max };
  }

  draw() {
    let bars = this.getBarScaling();
    let ctx: CanvasRenderingContext2D =
      this.canvasRef.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    ctx.fillStyle = 'rgba(109, 165, 25, 0.20)';
    ctx.strokeStyle = 'rgb(109, 165, 25)';

    for (let i = 0; i < this.barCount; i++) {
      ctx.fillRect(i * this.barWidth, this.height - bars[i], this.barWidth + .01, bars[i]);
      ctx.beginPath();
      ctx.moveTo((i + 1) * this.barWidth, this.height);
      ctx.lineTo((i + 1) * this.barWidth, this.height - bars[i]);
      ctx.stroke();
    }
  }
}