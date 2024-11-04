import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-trading-pair-form',
  templateUrl: './trading-pair-form.component.html',
  styleUrls: ['./trading-pair-form.component.css']
})
export class TradingPairFormComponent {
  tradingPairForm: FormGroup;
  isBackTesting = false

  constructor(private fb: FormBuilder, 
    private httpClient:HttpClient,
    private dialog: MatDialog) {
    this.tradingPairForm = this.fb.group({
      pair: ['BTCUSD', [Validators.required]],
      miner: ['5Exax1W9RiNbARDejrthf4SK1FQ2u9DPUhCq9jm58gUysTy4', [Validators.required]],
      asset1: ['0.0146', [Validators.required, Validators.min(0.00001)]],
      asset2: ['1000', [Validators.required, Validators.min(0.00001)]]
    });
  }

  onSubmit() {
    if (this.tradingPairForm.valid) {
      const newPair = this.tradingPairForm.value;
      // Logic to send the new pair to the backend or add it to a monitored list
      console.log('New Pair Added:', newPair);
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
          this.httpClient.post("api/back-test", {trade_pair, miner, asset1, asset2}))
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
