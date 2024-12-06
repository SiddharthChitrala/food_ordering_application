import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserMenuComponent } from './user/user-menu/user-menu.component';
import { UserCartComponent } from './user/user-cart/user-cart.component';
import { UserOrderTrackingComponent } from './user/user-order-tracking/user-order-tracking.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { AdminOrderOverviewComponent } from './admin/admin-order-overview/admin-order-overview.component';
import { DeliveryOrderViewComponent } from './delivery/delivery-order-view/delivery-order-view.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { DeliveryDashboardComponent } from './delivery/delivery-dashboard/delivery-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserMenuComponent,
    UserCartComponent,
    UserOrderTrackingComponent,
    AdminMenuComponent,
    AdminOrderOverviewComponent,
    DeliveryOrderViewComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    DeliveryDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
