import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { UserMenuComponent } from './user/user-menu/user-menu.component';
import { UserOrderTrackingComponent } from './user/user-order-tracking/user-order-tracking.component';
import { UserCartComponent } from './user/user-cart/user-cart.component';
import { DeliveryDashboardComponent } from './delivery/delivery-dashboard/delivery-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-menu', component: AdminMenuComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'user-menu', component: UserMenuComponent },
  { path: 'user-order', component: UserOrderTrackingComponent },
  { path: 'user-cart', component: UserCartComponent },
  { path: 'delivery-dashboard', component: DeliveryDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
