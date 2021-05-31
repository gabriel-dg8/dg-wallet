import { Injectable } from '@angular/core';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  progressRef: NgProgressRef;

  constructor(progress: NgProgress) {
    this.progressRef = progress.ref('progress');
  }

  start() {
    this.progressRef.start();
  }

  stop() {
    this.progressRef.complete();
  }
}
