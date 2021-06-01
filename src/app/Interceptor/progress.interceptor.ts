import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProgressService } from '../services/progress.service';

@Injectable()
/**
 * Intercepta las peticiones para mostrar un progresbar cuando se esta realizando la petición
 */
export class ProgressInterceptor implements HttpInterceptor {

  activeRequest = 0;
  constructor(private progres: ProgressService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.activeRequest === 0) {
      this.progres.start();
    }
    this.activeRequest++;
    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequest--;
        if (this.activeRequest === 0) {
          this.progres.stop();
        }
      })
    );
  }
}
