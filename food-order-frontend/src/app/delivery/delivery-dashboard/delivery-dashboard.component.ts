import { Component } from '@angular/core';
import { DeliveryOrderViewComponent } from '../delivery-order-view/delivery-order-view.component';

@Component({
  selector: 'app-delivery-dashboard',
  templateUrl: './delivery-dashboard.component.html',
  styleUrls: ['./delivery-dashboard.component.css']
})
export class DeliveryDashboardComponent {
  isMenuOpen: boolean = false;
  activeIndex: number = -1;

  toggleNavbar() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setActiveIndex(index: number) {
    this.activeIndex = this.activeIndex === index ? -1 : index;
  }

  activeComponent: any = null;

  setActiveComponent(section: string) {
    switch (section) {
      case 'Order':
        this.activeComponent = DeliveryOrderViewComponent;
        break;
      default:
        break;
    }
  }
  navigateTo(section: string) {
    this.setActiveComponent(section);
  }

}
