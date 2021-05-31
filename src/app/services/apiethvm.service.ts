import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '../models/Token';

@Injectable({
  providedIn: 'root'
})
export class ApiEthvmService {

  api: string = "https://api.ethvm.com/";
  constructor(private http: HttpClient) { }

  async getTokens(): Promise<Token[]> {
    let data = await this.http.post(this.api, {
      "operationName": "getLatestPrices",
      "query": "query getLatestPrices {\n  getLatestPrices {\n    id\n    symbol\n    name\n    image\n    contract\n    current_price\n    market_cap\n    total_volume\n    total_supply\n    price_change_percentage_24h\n    __typename\n  }\n}\n",
      "variables": {}
    }).toPromise();
    let tokens: Token[] = data["data"]["getLatestPrices"] as Token[];
    tokens.shift();
    return tokens;
  }

  async getAverage() {
    let year = new Date()
    let t = new Date((year.getFullYear() - 1) + "-" + year.getMonth() + "-" + year.getDate());
    var params = {
      "operationName": "getTimeseriesData",
      "query": "query getTimeseriesData($key: String!, $scale: TimeseriesScale!, $fromT: Int!, $toT: Int, $nextKey: String) {\n  getTimeseriesData(key: $key, scale: $scale, fromT: $fromT, toT: $toT, nextKey: $nextKey) {\n    items {\n      value\n      timestamp\n      __typename\n    }\n    nextKey\n    __typename\n  }\n}\n",
      "variables": {
        "fromT": Number.parseInt((Math.floor(t.getTime() / 1000)).toString()),
        "key": "TX_COUNT_AVG",
        "scale": "days"
      }
    };
    let data = await this.http.post(this.api, params).toPromise();
    return data["data"]["getTimeseriesData"]["items"];
  }

}
