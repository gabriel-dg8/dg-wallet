import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { SharedService } from '../services/shared.service';
import { menuSign } from '../vars/menu';

@Component({
    selector: 'app-SignAccount',
    template: `
    <app-info-account></app-info-account>
    <div class="row contenido">
        <router-outlet></router-outlet>
    </div>
    `
})
export class SignAccountComponent implements OnInit, AfterContentChecked {

    constructor(private serv_menu: MenuService, private serv_shared: SharedService) {
        serv_shared.setActived(false);
        serv_shared.setRegistered(false);
    }

    ngAfterContentChecked(): void {
        this.serv_menu.setMeinMenu(menuSign);
    }

    ngOnInit(): void {
    }

}
