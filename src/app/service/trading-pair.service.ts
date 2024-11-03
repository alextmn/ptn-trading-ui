import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradingPairService {
  private baseUrl = ''; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  addPair(pair: { pair: string; amount: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-pair`, pair);
  }

  cancelPair(pair: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/cancel-pair`, { pair });
  }
}
