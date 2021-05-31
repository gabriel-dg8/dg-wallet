import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  private emitCurrency = new Subject<number>();
  setCurrency = this.emitCurrency.asObservable();

  async getCurrency(from: string, to: string) {
    return await this.http.get<any>("http://localhost/monedas/?from=" + from + "&to=" + to).toPromise();
  }

  async getUSD() {
    let temp = await this.getCurrency('ETH', 'USD');
    this.emitCurrency.next(temp);
    return temp;
  }
}
