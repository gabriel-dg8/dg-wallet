import { Injectable } from '@angular/core';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';

@Injectable({
  providedIn: 'root'
})
/**
 * Mostrar el progressbar
 */
export class ProgressService {

  progressRef: NgProgressRef;

  constructor(progress: NgProgress) {
    this.progressRef = progress.ref('progress');
  }

  /**
   * Iniciar el proceso
   */
  start() {
    this.progressRef.start();
  }

  /**
   * Terminar el proceso
   */
  stop() {
    this.progressRef.complete();
  }
}
