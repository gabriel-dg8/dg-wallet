import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para la conversión de monedas
 */
export class CurrencyService {

  constructor(private http: HttpClient) { }

  private emitCurrency = new Subject<number>();
  setCurrency = this.emitCurrency.asObservable();


  /**
   * Conversión de una moneda en especifica a otra
   * @param from de la moneda
   * @param to a esta moneda
   * @returns 
   */
  async getCurrency(from: string, to: string) {
    return await this.http.get<any>("https://factura-digital.000webhostapp.com/moneda/?from=" + from + "&to=" + to).toPromise();
  }

  /**
   * Obtener el precio en USD del ETH y notificar el cambio
   * @returns 
   */
  async getUSD() {
    let temp = await this.getCurrency('ETH', 'USD');
    this.emitCurrency.next(temp);
    return temp;
  }
}
