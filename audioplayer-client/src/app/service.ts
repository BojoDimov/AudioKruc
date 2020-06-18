import { Injectable } from '@angular/core';
import { range, circle } from 'src/utils';


class Path {
  points: number[][];
  close: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Service {

  paths: Path[] = [
    { points: range(1, 401).map(circle([400, 300])(250)(401)), close: true }
  ];
}

 // this.path(range(1, pointsCount + 1)
        //   .map(circle(center)(rMin)(pointsCount)), true);

        // this.path(range(1, pointsCount + 1)
        //   .map(circle(center)(rMax)(pointsCount)), true);