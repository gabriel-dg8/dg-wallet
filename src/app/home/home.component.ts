import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
/**
 * Componente principal
 */
export class HomeComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['/login']);
  }

  newaccount() {
    this.router.navigate(['/create/account']);
  }

}
