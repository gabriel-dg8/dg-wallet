import { Component, OnDestroy, OnInit } from '@angular/core';
import CryptoJS from 'crypto-js';
import { Toast } from 'src/app/functions/Toast';
import { Web3Service } from 'src/app/services/web3.service';
import QRCode from 'qrcode';
import { environment } from 'src/environments/environment';
import { CurrencyService } from 'src/app/services/currency.service';
declare const bootstrap;
@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.component.html',
  styleUrls: ['./info-account.component.scss']
})
/**
 * Información sobre la cuenta
 */
export class InfoAccountComponent implements OnInit, OnDestroy {

  address: string = "";
  balance: any = 0;
  network: string = "";
  interval: any;
  cambio: number = 0;

  constructor(private serv_web3: Web3Service, private serv_currency: CurrencyService) { }


  ngOnInit(): void {
    let AddressCrypt = localStorage.getItem(environment.Storage.AddresCrypt);
    this.address = CryptoJS.AES.decrypt(AddressCrypt, environment.PassAES).toString(CryptoJS.enc.Utf8);
    this.network = environment.UrlNodo;
    this.getBalance();
    this.serv_web3.setBalance.subscribe(resp => {
      this.balance = resp;
    });
    this.getCurrrency();
    this.interval = setInterval(() => {
      this.getCurrrency();
    }, 1000 * 30);
    this.serv_currency.setCurrency.subscribe(money => {
      this.cambio = money;
    })
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  async getCurrrency() {
    this.cambio = await this.serv_currency.getUSD();
  }

  async getBalance() {
    await this.serv_web3.getBalance(this.address);
  }

  Copy() {
    navigator.clipboard.writeText(this.address);
    Toast.sucess("Copied address");
  }

  QrCode() {
    var QrModal = new bootstrap.Modal(document.getElementById('QrModal'), {
      keyboard: false
    });
    var canvas = document.getElementById('canvas');
    QRCode.toCanvas(canvas, this.address);
    QrModal.show();
  }

}
