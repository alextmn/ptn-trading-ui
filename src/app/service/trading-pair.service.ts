import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradingPairService {
  private subject = new Subject<String>() 

  private baseUrl = 'api'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  addPair(exchange:string, trade_pair: string, miner: string, asset1: string, asset2: string, 
    binance_api_key: string,  binance_secret_key: string) {
    return this.http.post(`${this.baseUrl}/add-pair`,  {exchange, trade_pair, miner, asset1, asset2, binance_api_key,binance_secret_key })
    .subscribe(_ => this.subject.next(''));
  }

  backtest(trade_pair: string, miner: string, asset1: string, asset2: string):Observable<any> {
    return this.http.post(`${this.baseUrl}/back-test`, { trade_pair, miner, asset1, asset2 });
  }


  cancelPair(id: number) {
    return this.http.post(`${this.baseUrl}/delete-pair`, { id })
     .subscribe(_ => this.subject.next(''));
  }

  
  pairList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pair-list`);
  }

  trace(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/trace`, {id});
  }

  observable(): Observable<any> {
    return this.subject.asObservable();
  }
}
