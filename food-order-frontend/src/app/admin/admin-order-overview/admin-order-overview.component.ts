import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-order-overview',
  templateUrl: './admin-order-overview.component.html',
  styleUrls: ['./admin-order-overview.component.css']
})
export class AdminOrderOverviewComponent {
  tracking: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    this.http.get('http://localhost:9000/getDelivery')
      .subscribe((address: any) => {
        this.tracking = address;
      }, error => {
        console.error('Error fetching data', error);
      });
  }
}
