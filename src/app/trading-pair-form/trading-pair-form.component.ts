import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trading-pair-form',
  templateUrl: './trading-pair-form.component.html',
  styleUrls: ['./trading-pair-form.component.css']
})
export class TradingPairFormComponent {
  tradingPairForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tradingPairForm = this.fb.group({
      pair: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit() {
    if (this.tradingPairForm.valid) {
      const newPair = this.tradingPairForm.value;
      // Logic to send the new pair to the backend or add it to a monitored list
      console.log('New Pair Added:', newPair);
    }
  }
}
