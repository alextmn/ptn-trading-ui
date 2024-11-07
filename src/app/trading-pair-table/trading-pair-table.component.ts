import { Component, OnInit } from '@angular/core';
import { TradingPairService } from '../service/trading-pair.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-trading-pair-table',
  templateUrl: './trading-pair-table.component.html',
  styleUrls: ['./trading-pair-table.component.css']
})
export class TradingPairTableComponent  implements OnInit {

  
  monitoredPairs = [];

  constructor(private tradingPairService: TradingPairService,
    private dialog: MatDialog
  ) {}
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

  showTrace(id: any) {
    this.tradingPairService.trace(id).subscribe(a => 
    this.dialog.open(ErrorDialogComponent, {
      data: {
        title: 'Trading History',
        message: a.trace
      }
    }));
  }
}
