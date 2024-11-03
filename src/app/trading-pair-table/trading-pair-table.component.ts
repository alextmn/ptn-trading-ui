import { Component } from '@angular/core';

@Component({
  selector: 'app-trading-pair-table',
  templateUrl: './trading-pair-table.component.html',
  styleUrls: ['./trading-pair-table.component.css']
})
export class TradingPairTableComponent {
  monitoredPairs = [
    { pair: 'BTC/USDT', amount: 100 },
    { pair: 'ETH/USDT', amount: 50 }
    // Add logic to fetch actual data or update this list as needed
  ];

  displayedColumns: string[] = ['pair', 'amount', 'actions'];

  cancelPair(pair: string) {
    console.log(`Cancel monitoring for: ${pair}`);
    // Logic to send a cancel request to the backend
  }
}
