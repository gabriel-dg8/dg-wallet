import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Toast } from 'src/app/functions/Toast';
import { Block } from 'src/app/models/Block';
import { Transacction } from 'src/app/models/Transacction';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-check-transacction',
  templateUrl: './check-transacction.component.html',
  styleUrls: ['./check-transacction.component.scss']
})
export class CheckTransacctionComponent implements OnInit {

  transacction: string = "";
  block: Block = {
    difficulty: "",
    extraData: "",
    gasLimit: 0,
    gasUsed: 0,
    hash: "",
    logsBloom: "",
    miner: "",
    mixHash: "",
    nonce: "",
    number: 1,
    parentHash: "",
    receiptsRoot: "",
    sha3Uncles: "",
    size: 0,
    stateRoot: "",
    timestamp: 1,
    totalDifficulty: "",
    transactions: [],
    transactionsRoot: "",
    uncles: []
  };
  transactions: Transacction[] = [];
  constructor(public serv_web3: Web3Service, routerActivated: ActivatedRoute) {
    this.transacction = routerActivated.snapshot.params.transaction;
  }

  ngOnInit(): void {
    this.getBlock();
  }

  async getBlock() {
    this.block = await this.serv_web3.getBlock(this.transacction);
    if (this.block == null) {
      Toast.error("The block was not found");
      this.block = {
        transactions: [],
        hash: "",
        difficulty: "",
        extraData: "",
        gasLimit: 0,
        gasUsed: 0,
        logsBloom: "",
        miner: "",
        mixHash: "",
        nonce: "",
        number: 0,
        parentHash: "",
        receiptsRoot: "",
        sha3Uncles: "",
        size: 0,
        stateRoot: "",
        timestamp: Math.floor(Date.now()) / 1000,
        totalDifficulty: "",
        transactionsRoot: "",
        uncles: []
      }
      return;
    }
    this.serv_web3.setTransacction.subscribe(t => {
      this.transactions.push(t);
    });
    await this.serv_web3.getTransaction(this.block);
  }

  getPercent() {
    let percent = (this.block.gasUsed * 100) / this.block.gasLimit;
    return "width:" + (Math.trunc(percent)) + "%";
  }

  getEth(data: string) {
    return this.serv_web3.toEther(data);
  }







}
