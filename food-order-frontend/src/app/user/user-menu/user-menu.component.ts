import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  dishes: any[] = [];
  selectedDish: any | null = null;
  orders: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getDishes();
  }

  getDishes() {
    this.http.get('http://localhost:9000/dishes')
      .subscribe((dishes: any) => {
        this.dishes = dishes;
      }, error => {
        console.error('Error fetching dishes', error);
      });
  }

  order(dish: any) {
    const orderData = {
      dishName: dish.dishName,
      dishPrice: dish.price,
      dishQuantity: 1 // Set default quantity as 1
    };
    console.log(orderData);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.post('http://localhost:9000/createOrder', orderData, { headers })
    .subscribe(
      (response: any) => {
        console.log('Order placed successfully!', response);
        // Optionally update your orders array or any other UI-related logic
      },
      (error: any) => {
        console.error('Failed to place order', error);
        if (error.error && error.error.error) {
          console.error('Server error message:', error.error.error);
          // Display error to the user
          // For example, set an error message property to be shown in the UI
          // this.errorMessage = error.error.error;
        } else {
          console.error('Unexpected error occurred.');
          // Handle other types of errors
        }
      }
    );
    }  

}
