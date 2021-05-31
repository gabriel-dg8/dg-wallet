import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Web3Service } from '../services/web3.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  address = "";
  constructor(routerActivated: ActivatedRoute, private serv_web3: Web3Service) {
    this.address = routerActivated.snapshot.params.address;
  }

  ngOnInit(): void {
    this.getDate();
  }


  async getDate() {
    let balance = await this.serv_web3.getBalance(this.address);
    let d = await this.serv_web3.web3.eth.getAccounts();
  }

}
