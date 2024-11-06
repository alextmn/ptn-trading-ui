import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Title } from '@angular/platform-browser';
import { TradingPairService } from '../service/trading-pair.service';

@Component({
  selector: 'app-trading-pair-form',
  templateUrl: './trading-pair-form.component.html',
  styleUrls: ['./trading-pair-form.component.css']
})
export class TradingPairFormComponent {

  tradingPairForm: FormGroup;
  isBackTesting = false

  constructor(private fb: FormBuilder, 
    private tradingPairService: TradingPairService,
    private httpClient:HttpClient,
    private dialog: MatDialog) {
    this.tradingPairForm = this.fb.group({
      pair: ['BTCUSD', [Validators.required]],
      miner: ['5Exax1W9RiNbARDejrthf4SK1FQ2u9DPUhCq9jm58gUysTy4', [Validators.required]],
      exchangeType: ['simulated', [Validators.required] ],
      asset1: ['0.0146', [Validators.required, Validators.min(0.00001)]],
      asset2: ['1000', [Validators.required, Validators.min(0.00001)]]
    });
  }

  async addPair() {
    if (this.tradingPairForm.valid) {
      const trade_pair = this.tradingPairForm.value.pair;
      const miner = this.tradingPairForm.value.miner;
      const asset1 = this.tradingPairForm.value.asset1;
      const asset2 = this.tradingPairForm.value.asset2;
      this.tradingPairService.addPair(trade_pair, miner, asset1, asset2)
      console.log('New Pair Added:', trade_pair);
    }
  }

  async backtest() {
    if (this.tradingPairForm.valid) {
      try {
        this.isBackTesting = true;
        const trade_pair = this.tradingPairForm.value.pair;
        const miner = this.tradingPairForm.value.miner;
        const asset1 = this.tradingPairForm.value.asset1;
        const asset2 = this.tradingPairForm.value.asset2;
        const r: any = await firstValueFrom(
          this.tradingPairService.backtest(trade_pair, miner, asset1, asset2))
        console.log(r.text)

        this.dialog.open(ErrorDialogComponent, {
          data: {
            title: 'Back Test Result',
            message: r.text
          }
        });
      } finally {
        this.isBackTesting = false;
      }
    }
  }
}
