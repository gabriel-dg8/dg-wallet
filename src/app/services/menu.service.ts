import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  private emitMenu = new Subject<any>();
  setMenu = this.emitMenu.asObservable();

  setMeinMenu(menu: any) {
    this.emitMenu.next(menu);
  }
}
