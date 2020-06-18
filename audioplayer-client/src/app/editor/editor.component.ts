import { Component, ViewChild, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { circle, sine, range } from 'src/utils';
import { Service } from '../service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit, OnDestroy {
  @Input('transform$')
  transform$: Subject<any>;

  @Input('audioDataChannel')
  audioData$: Subject<Float32Array>;

  @ViewChild('paramsForm')
  paramsForm: NgForm;

  formChangesSubscription: Subscription = null;
  audioDataSubscription: Subscription = null;

  params = {
    resolution: 400,
    center: {
      x: 400,
      y: 300
    },
    radius: 230,
    delta: 15,
    k: 6,
    w: 6,
    phase: Math.PI / 2
  };

  constructor(private state: Service) { }

  ngAfterViewInit(): void {
    this.audioDataSubscription = this.audioData$.subscribe(data => {
      let transform = (e, i) =>
        circle([this.params.center.x, this.params.center.y])
          (this.params.radius +
            data[i] * this.params.radius +
            sine(this.params.delta)(this.params.k)(this.params.w)(this.params.phase)(i, i))
          (data.length + 1)(e);

      //this.transform$.next(range(1, data.length + 1).map(transform));
      this.state.paths[1] = { points: range(1, data.length + 1).map(transform), close: true };
    });

    this.formChangesSubscription = this.paramsForm.valueChanges.subscribe(_ => {
      let transform = (e, i) =>
        circle([this.params.center.x, this.params.center.y])
          (this.params.radius +
            this.params.delta +
            sine(this.params.delta)(this.params.k)(this.params.w)(this.params.phase)(i, i))
          (this.params.resolution)(e);

      this.transform$.next(range(1, this.params.resolution + 1).map(transform));
    });
  }

  ngOnDestroy() {
    if (this.formChangesSubscription)
      this.formChangesSubscription.unsubscribe();

    if (this.audioDataSubscription)
      this.audioDataSubscription.unsubscribe();
  }
}
