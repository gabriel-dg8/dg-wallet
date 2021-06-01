import { Component, Input, OnInit } from '@angular/core';
import { Block } from 'src/app/models/Block';
import { Transacction } from 'src/app/models/Transacction';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-transacction',
  templateUrl: './transacction.component.html',
  styleUrls: ['./transacction.component.scss']
})
/**
 * Componente de las transacciones
 */
export class TransacctionComponent implements OnInit {

  @Input('transactions') transactions: Transacction[] = [];

  select_transaction: Transacction;
  block: Block;
  constructor(public serv_web3: Web3Service) { }

  ngOnInit(): void {
  }

  getStr(data: string) {
    if (data == null) {
      return "";
    } else {
      return data.substring(0, 15);
    }
  }

  async setTrans(transaction: Transacction) {
    this.select_transaction = transaction;
    this.block = await this.serv_web3.getBlock(transaction.blockHash);
  }

}
