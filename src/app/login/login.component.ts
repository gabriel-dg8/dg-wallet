import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../services/web3.service';
import CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Toast } from '../functions/Toast';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password: string = "";
  keyAccount: string = "";
  typelogin = "0";
  address: string = "";
  privateKey: String = "";

  constructor(private serv_web3: Web3Service, private router: Router) { }

  ngOnInit(): void {

  }

  login() {
    if (this.typelogin === '0') {
      try {
        let resp = this.serv_web3.web3.eth.accounts.decrypt(JSON.parse(this.keyAccount), this.password);
        let passCrypt = CryptoJS.AES.encrypt(this.password, environment.PassAES).toString();
        let KeyAccountCrypt = CryptoJS.AES.encrypt(this.keyAccount, environment.PassAES).toString();
        let PrivateKeyCrypt = CryptoJS.AES.encrypt(resp.privateKey, environment.PassAES).toString();
        let AddressCrypt = CryptoJS.AES.encrypt(resp.address, environment.PassAES).toString();
        if (!this.serv_web3.web3.utils.isAddress(resp.address)) {
          Toast.error("The address is incorrect");
          return;
        }
        localStorage.setItem(environment.Storage.passCrypt, passCrypt);
        localStorage.setItem(environment.Storage.KeyAccountCrypt, KeyAccountCrypt);
        localStorage.setItem(environment.Storage.PrivateKey, PrivateKeyCrypt);
        localStorage.setItem(environment.Storage.AddresCrypt, AddressCrypt);
      } catch (err) {
        console.log(err);

        Toast.error("Your password or file is incorrect");
      }
    } else {
      if (!this.serv_web3.web3.utils.isAddress(this.address)) {
        Toast.error("The address is incorrect");
        return;
      }
      let PrivateKeyCrypt = CryptoJS.AES.encrypt(this.privateKey, environment.PassAES).toString();
      let AddressCrypt = CryptoJS.AES.encrypt(this.address, environment.PassAES).toString();
      localStorage.setItem(environment.Storage.PrivateKey, PrivateKeyCrypt);
      localStorage.setItem(environment.Storage.AddresCrypt, AddressCrypt);
    }
    document.getElementById('close').click();
    this.router.navigate(['dg/dashboard']);
    this.address = "";
    this.typelogin = "0";
    this.keyAccount = "";
    this.privateKey = "";
    this.password = "";

  }

  keyUp($event) {
    if ($event.keyCode === 13) {

      this.login();
    }
  }

  SelectKey(event: any) {
    let file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: ProgressEvent) => {
      try {

        let base64 = (<FileReader>event.target).result.toString();
        this.keyAccount = atob(base64.split(',')[1]).replace("ï»¿", "");
      } catch (err) {
        console.error(err);
      }
    }
  }

}
