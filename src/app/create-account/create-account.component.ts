import { Component, OnInit } from '@angular/core';
import { Toast } from '../functions/Toast';
import { Web3Service } from '../services/web3.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  password: string = "";
  banCreated: boolean = false;
  privateKey: any;
  constructor(private serv_web3: Web3Service) { }

  ngOnInit(): void {
  }

  create() {
    if (this.password.length < 5) {
      Toast.error("Your password requires a minimum length of 5 characters");
      return;
    }
    this.privateKey = this.serv_web3.createAccount(this.password);
    Toast.sucess("Your account was created");
    this.banCreated = true;
  }

  download() {
    this.serv_web3.downloadFile(JSON.stringify(this.privateKey), this.privateKey.address);
    document.getElementById('close').click();
    Toast.sucess("File was download");
  }
}
