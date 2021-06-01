import { Component, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';
import { menu } from './vars/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  Menu = menu;
  IsLogin = true;
  IsRegister = true;
  constructor(private serv_shared: SharedService) {
    serv_shared.setActived(true);
    serv_shared.setRegistered(true);
  }
  ngOnInit(): void {
    /**
     * Visualizar login
     */
    this.serv_shared.setLogin.subscribe(IsActive => {
      this.IsLogin = IsActive;
    });
    /**
     * Visualizar registro
     */
    this.serv_shared.setRegister.subscribe(IsRegister => {
      this.IsRegister = IsRegister;
    })
  }
}
