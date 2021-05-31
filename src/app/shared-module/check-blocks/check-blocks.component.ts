import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Block } from '../../models/Block';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'app-check-blocks',
  templateUrl: './check-blocks.component.html',
  styleUrls: ['./check-blocks.component.scss']
})
export class CheckBlocksComponent implements OnInit, OnDestroy {

  blocks: Block[] = [];
  secunds = 15;
  interval;
  search_block: string = "";
  constructor(public serv_web3: Web3Service, private router: Router) { }


  ngOnInit(): void {
    this.getTransacctions();
    this.interval = setInterval(() => {
      if (this.secunds == 0) {
        this.secunds = 16;
        this.getTransacctions();
      }
      this.secunds--;
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  getUrl(hash: string) {
    if (location.href.indexOf("dg") > 0) {
      return "/dg/block" + "/" + hash;
    } else {
      return "/block" + "/" + hash;
    }
  }

  async getTransacctions() {
    this.blocks = await this.serv_web3.getBlocks();
  }

  getDate(block: Block) {
    let timestamp = block.timestamp;
    let longitud = timestamp + "".length;
    let newTimes = 1;
    if (longitud != 13) {
      newTimes = 1000;
    }
    timestamp = timestamp * newTimes;
    return moment(timestamp).fromNow();
  }

  SearchKey($event) {
    if ($event.keyCode === 13) {
      this.Buscar();
    }
  }

  Buscar() {
    this.router.navigate([this.getUrl(this.search_block)]);
  }
}
