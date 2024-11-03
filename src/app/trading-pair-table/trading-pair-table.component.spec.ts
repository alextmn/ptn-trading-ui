import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingPairTableComponent } from './trading-pair-table.component';

describe('TradingPairTableComponent', () => {
  let component: TradingPairTableComponent;
  let fixture: ComponentFixture<TradingPairTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradingPairTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TradingPairTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
