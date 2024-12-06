import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderViewComponent } from './delivery-order-view.component';

describe('DeliveryOrderViewComponent', () => {
  let component: DeliveryOrderViewComponent;
  let fixture: ComponentFixture<DeliveryOrderViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryOrderViewComponent]
    });
    fixture = TestBed.createComponent(DeliveryOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
