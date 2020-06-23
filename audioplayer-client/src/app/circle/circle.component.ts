import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { circle, sineCircle, range, makePath } from 'src/utils';
import { Subject } from 'rxjs';
import { Service } from '../service';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements AfterViewInit {
  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D = null;

  @Input('transform$')
  transform$: Subject<any>;

  constructor(private state: Service) { }

  drawToCanvas = () => {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.ctx.beginPath();
    this.state.paths.forEach(path => makePath(this.ctx, path.points, path.close));
    this.ctx.closePath();
    this.ctx.stroke();
    window.requestAnimationFrame(this.drawToCanvas);
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    if (this.ctx != null) {
      this.ctx.strokeStyle = "white"
      this.ctx.lineWidth = 3;
      this.ctx.lineJoin = 'round';
      this.ctx.lineCap = 'round';

      window.requestAnimationFrame(this.drawToCanvas);
    }
  }
}