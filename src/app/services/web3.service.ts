import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import Web3 from 'web3';
import FileServer from 'file-saver';
import { Block } from '../models/Block';
import { Transacction } from '../models/Transacction';
import CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '@ethereumjs/tx'
import Common from '@ethereumjs/common'
import { GasPrice } from '../models/GasPrice';
import { Toast } from '../functions/Toast';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  public web3: Web3;
  constructor(private http: HttpClient) {
    this.web3 = new Web3(Web3.givenProvider || environment.UrlNodo);
  }

  public createAccount(password: string) {
    const entropy = this.web3.utils.sha3(Math.random().toString(16) + this.web3.utils.randomHex(32));
    const wallet = this.web3.eth.accounts.privateKeyToAccount(entropy);
    let encrypted = wallet.encrypt(password);
    return encrypted;
  }

  public toEther(data: string) {
    return this.web3.utils.fromWei(data, 'ether');
  }



  private emitBalance = new Subject<any>();
  setBalance = this.emitBalance.asObservable();

  public async getBalance(address: string) {
    let balance = await this.web3.eth.getBalance(address);
    this.emitBalance.next(this.toEther(balance));
  }

  public async getBlocks(top: number = 10): Promise<Block[]> {
    let blocks: Block[] = [];
    let block = this.toBlock(await this.web3.eth.getBlock('latest'));
    blocks.push(block);
    let numberBlock = block.number;
    while (top > 1) {
      numberBlock--;
      block = this.toBlock(await this.web3.eth.getBlock(numberBlock));
      blocks.push(block);
      top--;
    }
    return blocks;
  }

  public async getBlock(Hash): Promise<Block> {
    let block = this.toBlock(await this.web3.eth.getBlock(Hash));
    return block;
  }

  private toBlock(block): Block {
    return JSON.parse(JSON.stringify(block)) as Block
  }




  private emitTransacction = new Subject<Transacction>();
  setTransacction = this.emitTransacction.asObservable();

  public async getTransaction(block: Block, addres: string = ""): Promise<Transacction[]> {
    let transacctions: Transacction[] = [];
    if (block != null && block.transactions != null) {
      for (let txHash of block.transactions) {
        let tx: Transacction = (await this.web3.eth.getTransaction(txHash)) as Transacction;
        if (addres.length > 2) {
          if (tx.from === addres || tx.to === addres) {
            transacctions.push(tx);
            this.emitTransacction.next(tx);
          }
        } else {
          transacctions.push(tx);
          this.emitTransacction.next(tx);
        }
        if (transacctions.length == 1) {
          break;
        }
      }
    }
    return transacctions;
  }

  public getUtf8(hex) {
    try {
      return this.web3.utils.hexToUtf8(hex);
    } catch (err) {
      return "";
    }
  }

  getDate(timestamp) {
    let longitud = timestamp + "".length;
    let newTimes = 1;
    if (longitud != 13) {
      newTimes = 1000;
    }
    timestamp = timestamp * newTimes;
    return moment(timestamp).format("MMMM Do YYYY, h:mm:ss a") + " (" + moment(timestamp).fromNow() + ")";
  }

  timestamp(time) {
    let longitud = time + "".length;
    let newTimes = 1;
    if (longitud != 13) {
      newTimes = 1000;
    }
    time = time * newTimes;
    return new Date(time);;
  }

  getDifficulty(difficulty) {
    return Number.parseFloat(this.web3.utils.fromWei(difficulty, 'micro')).toFixed(1);
  }


  downloadFile(json: string, address: string) {
    var blob = new Blob([json], { type: "text/plain;charset=utf-8" });
    let name = moment(new Date()).format('YYYY-MM-DD[T]hh:mm:ss[Z]') + address;
    FileServer.saveAs(blob, name);
  }

  async send_transacction(ammount, to_address, gasselect) {
    try {
      ammount *= 1000000000000000000;
      let My_AddressDeCrypt = CryptoJS.AES.decrypt(localStorage.getItem(environment.Storage.AddresCrypt), environment.PassAES).toString(CryptoJS.enc.Utf8)
      let txCount = await this.web3.eth.getTransactionCount(My_AddressDeCrypt);
      let PrivateKeyDeCrypt = CryptoJS.AES.decrypt(localStorage.getItem(environment.Storage.PrivateKey), environment.PassAES).toString(CryptoJS.enc.Utf8);
      const privateKey = Buffer.from(PrivateKeyDeCrypt, 'hex');
      let rawTr = {
        nonce: this.web3.utils.toHex(txCount.toString()),
        gasPrice: this.web3.utils.toHex(this.web3.utils.toWei(gasselect + "", 'gwei')),
        gasLimit: this.web3.utils.toHex(22000),
        to: to_address,
        value: this.web3.utils.toHex(ammount)
        //data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
      }
      const common = new Common({ chain: environment.chain })
      const tx = Transaction.fromTxData(rawTr, { common })
      const signedTx = tx.sign(privateKey)
      const serializedTx = signedTx.serialize()
      let response = await this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
      await this.getBalance(My_AddressDeCrypt);
      if (response.blockHash == null) {
        Toast.sucess("The transaction is being processed");
      } else {
        Toast.sucess("The transaction was completed");
      }
    } catch (err) {
      Toast.error("The transaction could not be completed");
    }

  }

  async getTransacctionsFromMyAddress(fromBlock: number, toBlock: number) {
    let numberBlock = fromBlock;
    if (toBlock < 1) {
      toBlock = 1;
    }
    while (true) {
      let block = this.toBlock(await this.web3.eth.getBlock(numberBlock));
      let My_AddressDeCrypt = CryptoJS.AES.decrypt(localStorage.getItem(environment.Storage.AddresCrypt), environment.PassAES).toString(CryptoJS.enc.Utf8)
      await this.getTransaction(block, (My_AddressDeCrypt + ""));
      numberBlock--;
      if (numberBlock < toBlock)
        break;
    }
  }



  async getGasPrice(): Promise<GasPrice> {
    let gas = (await this.http.get("https://www.etherchain.org/api/gasPriceOracle").toPromise()) as GasPrice;
    let gasPrice = new GasPrice();
    gasPrice.fast = gas.fast;
    gasPrice.fastest = gas.fastest;
    gasPrice.safeLow = gas.safeLow;
    gasPrice.standard = gas.standard;
    return gasPrice;
  }

}
