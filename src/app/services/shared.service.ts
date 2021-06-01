import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para ocultar y/o mostrar el login y el registro
 */
export class SharedService {


  constructor() { }
  private emitLogin = new Subject<boolean>();
  setLogin = this.emitLogin.asObservable();

  setActived(isActive: boolean) {
    this.emitLogin.next(isActive);
  }

  private emitRegister = new Subject<boolean>();
  setRegister = this.emitRegister.asObservable();

  setRegistered(isActive: boolean) {
    this.emitRegister.next(isActive);
  }


}
