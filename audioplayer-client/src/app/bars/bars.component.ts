import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.css']
})
export class BarsComponent implements AfterViewInit {


  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D = null;

  spacerWidth: number = 2;
  barCount: number = 50;
  maxHeightPercentage = 0.8;
  minHeightPercentage = 0.1;
  startColor = [255, 173, 97];
  endColor = [195, 243, 98];

  bars = [];
  constructor() { }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    if (this.ctx != null) {
      window.requestAnimationFrame(this.drawToCanvas);
    }
  }

  drawToCanvas = () => {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    this.createBars().forEach(bar => {
      let color = bar.shift();
      this.ctx.fillStyle = (rgbToHex as any)(...color);
      (this.ctx.fillRect as any)(...bar);
      (this.ctx.strokeRect as any)(...bar);
    });

    window.requestAnimationFrame(this.drawToCanvas);
  }

  createBars(): any[][] {
    let result = [];

    for (let i = 0; i < this.barCount; ++i) {
      let color = [
        Math.round(this.startColor[0] + i / this.barCount * (this.endColor[0] - this.startColor[0])), // r
        Math.round(this.startColor[1] + i / this.barCount * (this.endColor[1] - this.startColor[1])), // g
        Math.round(this.startColor[2] + i / this.barCount * (this.endColor[2] - this.startColor[2])), // b
      ];

      let height = this.minHeightPercentage * this.canvas.nativeElement.height +
        Math.random() * (this.maxHeightPercentage - this.minHeightPercentage) * this.canvas.nativeElement.height;
      let width = (this.canvas.nativeElement.width - (this.barCount - 1) * this.spacerWidth) / this.barCount;

      let x = i * (width + this.spacerWidth);
      let y = this.canvas.nativeElement.height - height;

      result.push([color, x, y, width, height]);
    }
    return result;
  }
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

