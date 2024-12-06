import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-order-tracking',
  templateUrl: './user-order-tracking.component.html',
  styleUrls: ['./user-order-tracking.component.css']
})
export class UserOrderTrackingComponent {

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

  deleteOrder(address: string) {
    if (!confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    this.http.delete(`http://localhost:9000/deleteDelivery/${address}`).subscribe(
      () => {
        console.log('Video deleted successfully');
        this.getMenu(); 
      },
      (error) => {
        console.error('Error deleting video', error);
      }
    );
  }
}
