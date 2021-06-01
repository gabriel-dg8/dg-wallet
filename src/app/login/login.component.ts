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

/**
 * Componente de inicio de sesión
 */
export class LoginComponent implements OnInit {


  password: string = "";
  /**
   * Texto del archivo seleccionado
   */
  keyAccount: string = "";
  /**
   * Tipo de login
   * 0 mediante un archivo cifrado
   * 1 mediante address y llave privada
   */
  typelogin = "0";

  address: string = "";
  privateKey: String = "";

  constructor(private serv_web3: Web3Service, private router: Router) { }

  ngOnInit(): void {

  }

  /**
   * Validaciones necesarias para el inicio de sesión
   * @returns 
   */
  login() {
    if (this.typelogin === '0') {
      try {
        let resp = this.serv_web3.web3.eth.accounts.decrypt(JSON.parse(this.keyAccount), this.password);
        /**
         * Cifrado y guardado de variables en el localStorage
         */
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
      /**
      * Cifrado y guardado de variables en el localStorage
      */
      let PrivateKeyCrypt = CryptoJS.AES.encrypt(this.privateKey, environment.PassAES).toString();
      let AddressCrypt = CryptoJS.AES.encrypt(this.address, environment.PassAES).toString();
      localStorage.setItem(environment.Storage.PrivateKey, PrivateKeyCrypt);
      localStorage.setItem(environment.Storage.AddresCrypt, AddressCrypt);
    }
    /**
     * Limpieza de las variables y modal
     */
    document.getElementById('close').click();
    this.router.navigate(['dg/dashboard']);
    this.address = "";
    this.typelogin = "0";
    this.keyAccount = "";
    this.privateKey = "";
    this.password = "";

  }

  /**
   * Evento enter
   * @param $event 
   */
  keyUp($event) {
    if ($event.keyCode === 13) {
      this.login();
    }
  }

  /**
   * Evento al seleccionar un archivo
   * @param event 
   */
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
