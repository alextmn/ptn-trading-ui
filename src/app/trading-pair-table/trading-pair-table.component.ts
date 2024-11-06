import { Component, OnInit } from '@angular/core';
import { TradingPairService } from '../service/trading-pair.service';

@Component({
  selector: 'app-trading-pair-table',
  templateUrl: './trading-pair-table.component.html',
  styleUrls: ['./trading-pair-table.component.css']
})
export class TradingPairTableComponent  implements OnInit {
  
  monitoredPairs = [];

  constructor(private tradingPairService: TradingPairService) {}
  displayedColumns: string[] = ['id', 'miner', 'pair', 'last', 'actions'];

  ngOnInit(): void {

    this.update();
    this.tradingPairService.observable()
      .subscribe(_=> this.update())
  }

  private update() {
    this.tradingPairService.pairList()
      .subscribe(a => this.monitoredPairs = a);
  }
  cancelPair(id: number) {
    console.log(`Cancel monitoring for: ${id}`);
    this.tradingPairService.cancelPair(id)
  }
}
