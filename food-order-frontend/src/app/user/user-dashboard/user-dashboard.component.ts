import { Component } from '@angular/core';
import { UserCartComponent } from '../user-cart/user-cart.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { UserOrderTrackingComponent } from '../user-order-tracking/user-order-tracking.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

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
      case 'Cart':
        this.activeComponent = UserCartComponent;
        break;
      case 'Menu':
        this.activeComponent = UserMenuComponent;
        break;
      case 'Order':
        this.activeComponent = UserOrderTrackingComponent;
        break;
      default:
        break;
    }
  }
  navigateTo(section: string) {
    this.setActiveComponent(section);
  }
}
