import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Title } from '@angular/platform-browser';
import { TradingPairService } from '../service/trading-pair.service';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-trading-pair-form',
  templateUrl: './trading-pair-form.component.html',
  styleUrls: ['./trading-pair-form.component.css']
})
export class TradingPairFormComponent {

  tradingPairForm: FormGroup;
  isBackTesting = false
  selectedOption = 'simulated'

  constructor(private fb: FormBuilder, 
    private tradingPairService: TradingPairService,
    private httpClient:HttpClient,
    private dialog: MatDialog) {
    this.tradingPairForm = this.fb.group({
      pair: ['BTCUSD', [Validators.required]],
      miner: ['5Exax1W9RiNbARDejrthf4SK1FQ2u9DPUhCq9jm58gUysTy4', [Validators.required]],
      exchangeType: ['simulated', [Validators.required] ],
      binanceApiKey:['', [Validators.required]],
      binanceSecretKey:['', [Validators.required]],

      asset1: ['0.0146', [Validators.required, Validators.min(0.00001)]],
      asset2: ['1000', [Validators.required, Validators.min(0.00001)]]
    });
    this.formUpdate(this.selectedOption)
  }

  async addPair() {
    if (this.tradingPairForm.valid) {
      const trade_pair = this.tradingPairForm.value.pair;
      const miner = this.tradingPairForm.value.miner;
      const asset1 = this.tradingPairForm.value.asset1;
      const asset2 = this.tradingPairForm.value.asset2;
      const binanceApiKey = this.tradingPairForm.value.binanceApiKey;
      const binanceSecretKey = this.tradingPairForm.value.binanceSecretKey;
      this.tradingPairService.addPair(this.selectedOption, trade_pair, miner, asset1, asset2, binanceApiKey, binanceSecretKey)
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

  onSelectionChange(event: MatRadioChange) {
    
      this.selectedOption = event.value;
      this.formUpdate(this.selectedOption)
  }

  private formUpdate(value: string) {
    this.tradingPairForm.get('asset1')?.disable();
    this.tradingPairForm.get('asset2')?.disable();
    this.tradingPairForm.get('binanceApiKey')?.disable();
    this.tradingPairForm.get('binanceSecretKey')?.disable();

    switch(value) {
      case "simulated":
        this.tradingPairForm.get('asset1')?.enable();
        this.tradingPairForm.get('asset2')?.enable();
      break;
      case "binance":
        this.tradingPairForm.get('binanceApiKey')?.enable();
        this.tradingPairForm.get('binanceSecretKey')?.enable();
      break;
    }
  }
}
