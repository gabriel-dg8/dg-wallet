import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input('Menu') Menu;
  constructor(private router: Router, private serv_menu: MenuService) {

  }

  ngOnInit(): void {
    /*let temp = localStorage.getItem(environment.Storage.passCrypt);
    if (!(temp == null || temp == undefined)) {
      this.router.navigate(['dg/dashboard']);
    }*/
    this.serv_menu.setMenu.subscribe(menu => {
      this.Menu = menu;
    })
  }

  goBrand(url: string) {
    this.router.navigate([url]);
  }

  Go(item) {
    if (item.path === "#") {
      item.func();
    }
    else {
      this.router.navigate([item.path]);
    }
  }

}
