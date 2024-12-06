import { Component } from '@angular/core';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';
import { AdminOrderOverviewComponent } from '../admin-order-overview/admin-order-overview.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
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
      case 'Menu':
        this.activeComponent = AdminMenuComponent;
        break;
      case 'Orders':
        this.activeComponent = AdminOrderOverviewComponent;
        break;
      default:
        break;
    }
  }
  navigateTo(section: string) {
    this.setActiveComponent(section);
  }

}
