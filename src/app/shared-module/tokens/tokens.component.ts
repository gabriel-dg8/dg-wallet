import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/app/functions/Toast';
import { Token } from 'src/app/models/Token';
import { ApiEthvmService } from 'src/app/services/apiethvm.service';
declare const bootstrap;
@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent implements OnInit {

  search_token: string = "";
  tokens: Token[] = [];
  tokens_watch: Token[] = [];
  paginas: number = 0;
  page_select = 1;
  token_select: Token;
  modalToken;
  constructor(private ser_api: ApiEthvmService) { }

  ngOnInit(): void {
    this.getTokens();
    this.cleanToken();
    this.modalToken = new bootstrap.Modal(document.getElementById('ModelToken'), {
      keyboard: false
    })
  }


  cleanToken() {
    this.token_select = {
      contract: "",
      current_price: 1,
      id: 1,
      image: "",
      market_cap: 1,
      name: "",
      price_change_percentage_24h: 1,
      symbol: "",
      total_supply: 1,
      total_volume: 1
    };
  }

  async getTokens() {
    this.tokens = await this.ser_api.getTokens();
    this.paginas = this.tokens.length / 10;
    if (this.paginas % 2 != 0) {
      this.paginas++;
    }
    this.paginas = Number.parseInt(this.paginas.toString());
    this.WatchPage();
  }

  SearchKey($event) {
    if ($event.keyCode === 13) {
      this.Buscar();
    }
  }

  nextPage() {
    if (this.page_select == this.paginas) {
      return;
    }
    this.page_select++;
    this.WatchPage();
  }

  previusPage() {
    if (this.page_select == 1) {
      return;
    }
    this.page_select--;
    this.WatchPage();
  }

  WatchPage() {
    this.tokens_watch = this.tokens.slice((this.page_select - 1) * 10, this.page_select * 10);
  }

  Buscar() {
    let tok = this.tokens.find(I => I.symbol.toUpperCase() === this.search_token.toUpperCase())
    if (tok !== undefined) {
      this.SelectToken(tok);
    } else {
      Toast.error("The token was not found");
    }
    this.search_token = "";
  }

  SelectToken(token: Token) {
    this.token_select = token;
    this.modalToken.show();
  }

}
