import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
/**
 * Componente para el pie de página
 */
export class FooterComponent implements OnInit {

  email: string = "gabriel.moreno.97.01@gmail.com";
  telefono: string = "9191724644"
  constructor() { }

  ngOnInit(): void {
  }

}
