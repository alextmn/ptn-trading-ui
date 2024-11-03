import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingPairFormComponent } from './trading-pair-form.component';

describe('TradingPairFormComponent', () => {
  let component: TradingPairFormComponent;
  let fixture: ComponentFixture<TradingPairFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradingPairFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TradingPairFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
