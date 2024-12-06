import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDashboardComponent } from './delivery-dashboard.component';

describe('DeliveryDashboardComponent', () => {
  let component: DeliveryDashboardComponent;
  let fixture: ComponentFixture<DeliveryDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryDashboardComponent]
    });
    fixture = TestBed.createComponent(DeliveryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
