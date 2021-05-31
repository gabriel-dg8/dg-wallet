import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/app/functions/Toast';
import { GasPrice } from 'src/app/models/GasPrice';
import { CurrencyService } from 'src/app/services/currency.service';
import { MenuService } from 'src/app/services/menu.service';
import { Web3Service } from 'src/app/services/web3.service';
import { menuSign } from 'src/app/vars/menu';

@Component({
  selector: 'app-send-transaccion',
  templateUrl: './send-transaccion.component.html',
  styleUrls: ['./send-transaccion.component.scss']
})
export class SendTransaccionComponent implements OnInit {
  sendEth = 0;
  type: string = "ETH";
  amount: number = 0;
  to_address: string = "";
  ammountErr: string = "";
  mxn_eth = 0;
  usd_eth = 0;
  gasSelect = 1;
  gasPrice: GasPrice = new GasPrice();
  banActivated = true;
  constructor(public serv_web3: Web3Service, private serv_menu: MenuService, private serv_currency: CurrencyService) { }

  ngOnInit(): void {
    this.serv_menu.setMeinMenu(menuSign);
    this.getPrice();
  }

  async getPrice() {
    //this.eth_price = (await this.serv_web3.getValueOfUSDT())["ethereum"].usd;
    this.usd_eth = await this.serv_currency.getUSD();
    this.usd_eth = Number.parseFloat(this.usd_eth.toFixed(2));
    this.mxn_eth = await this.serv_currency.getCurrency("ETH", "MXN");
    this.mxn_eth = Number.parseFloat(this.mxn_eth.toFixed(2));
    this.gasPrice = await this.serv_web3.getGasPrice();
    this.banActivated = false;
  }

  getSendEth(): number {
    let tempammount = 0;
    if (this.type === "ETH") {
      tempammount = this.amount;
    }
    if (this.type === "USD") {
      tempammount = this.amount / this.usd_eth;
    }
    if (this.type === "MXN") {
      tempammount = this.amount / this.mxn_eth;
    }
    if (tempammount.toString().indexOf(".") >= 0) {
      let spl = tempammount.toString().split(".");
      return Number(spl[0] + "." + spl[1].substring(0, 18));
    }
    return tempammount;
  }

  ChangeAmount($event) {
    try {
      let regex = /^\d+(\.\d{1,18})?$/gm;
      if (this.type !== "ETH") {
        regex = /^\d+(\.\d{1,2})?$/gm;
      }
      if (!regex.test(this.amount + "")) {
        if (this.type === "ETH") {
          throw "The amount is incorrect min value is 0.000000000000000001";
        }
        throw "The amount is incorrect min value is 0.01";
      }
      throw "";
    } catch (err) {
      this.ammountErr = err;
    }
  }

  async SubmitTransaction() {
    if (this.getSendEth() <= 0) {
      Toast.error("Sending 0 " + this.type + " is not allowed")
      return;
    }
    if (!this.serv_web3.web3.utils.isAddress(this.to_address)) {
      Toast.error("The address is incorrect")
      return;
    }
    this.banActivated = true;
    this.serv_web3.send_transacction(this.getSendEth(), this.to_address, this.gasSelect);
    this.amount = 0;
    this.to_address = "";
    this.banActivated = false;
  }

  getDescriptionGas() {
    let description = this.gasSelect + " " + this.gasPrice.value + " ";
    if (this.gasSelect == this.gasPrice.safeLow) {
      return description + this.gasPrice.safeLowDesc;
    }
    if (this.gasSelect > this.gasPrice.safeLow && this.gasSelect < this.gasPrice.standard) {
      return description + this.gasPrice.standardDesc;
    }
    if (this.gasSelect > this.gasPrice.standard && this.gasSelect < this.gasPrice.fastest) {
      return description + this.gasPrice.fastDesc;
    }
    if (this.gasSelect == this.gasPrice.fastest) {
      return description + this.gasPrice.fastestDesc;
    }
    return description + this.gasPrice.safeLowDesc;;
  }

}
