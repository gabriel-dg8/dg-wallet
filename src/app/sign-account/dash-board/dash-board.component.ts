import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { menuSign } from 'src/app/vars/menu';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
/**
 * Componente del dashboard
 */
export class DashBoardComponent implements OnInit {

  constructor(private serv_menu: MenuService) {

  }

  ngOnInit(): void {
    this.serv_menu.setMeinMenu(menuSign);
  }


}
