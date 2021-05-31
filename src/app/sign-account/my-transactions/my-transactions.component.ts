import { Component, OnInit } from '@angular/core';
import { Transacction } from 'src/app/models/Transacction';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-my-transactions',
  templateUrl: './my-transactions.component.html',
  styleUrls: ['./my-transactions.component.scss']
})
export class MyTransactionsComponent implements OnInit {

  transactions: Transacction[] = [];
  fromBlock: number = 0;
  toBlock: number;
  constructor(private serv_web3: Web3Service) { }

  ngOnInit(): void {
    this.lasBlock();
    this.serv_web3.setTransacction.subscribe(t => {
      this.transactions.push(t);
    });
  }

  async lasBlock() {
    this.fromBlock = await this.serv_web3.web3.eth.getBlockNumber();
    this.getMyTransactions();
  }


  async getMyTransactions() {
    this.toBlock = this.fromBlock - 59;
    await this.serv_web3.getTransacctionsFromMyAddress(this.fromBlock, this.toBlock);
    this.fromBlock -= 59;
  }


}
