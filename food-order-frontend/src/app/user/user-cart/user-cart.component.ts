// user-cart.component.ts

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent {
  dishes: any[] = []; // Define an array to store fetched dishes
  totalAmount: number = 0; // Initialize total amount

  orders: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.http.get('http://localhost:9000/getOrders')
      .subscribe(
        (data: any) => {
          this.orders = data;
          this.dishes = data; // Assign fetched data to the 'dishes' array
          this.calculateTotalAmount(); // Calculate total amount initially
        },
        error => {
          console.error('Error fetching dishes', error);
        }
      );
  }

  // Calculate total amount
  calculateTotalAmount() {
    this.totalAmount = this.dishes.reduce((total, dish) => {
      const amount = total + (dish.dishQuantity * dish.dishPrice);
      console.log(amount);
      return amount;
    }, 0);
  }
  

  // Increment quantity
  increaseQuantity(index: number) {
    this.dishes[index].dishQuantity++;
    this.calculateTotalAmount(); // Recalculate total amount
  }

  // Decrement quantity
  decreaseQuantity(index: number) {
    if (this.dishes[index].dishQuantity > 1) {
      this.dishes[index].dishQuantity--;
      this.calculateTotalAmount(); // Recalculate total amount
    }
  }

  deleteDish(dishId: string) {
    this.http.delete(`http://localhost:9000/deleteOrder/${dishId}`).subscribe(
      (data: any) => {
        // On successful deletion from the server, update the local dishes array
        this.dishes = this.dishes.filter((dish) => dish._id !== dishId);
        this.calculateTotalAmount(); // Recalculate total amount after deletion
      },
      (error) => {
        console.error('Error deleting dish', error);
      }
    );
  }

  name: string = '';
  email: string = '';
  address: string = '';
  phone: string = '';
  totalMoney:string="";
  cardNo: string = '';
  orderDetails: string = '';
  generateOrderDetails() {
    this.orderDetails = this.orders.map(order => `${order.dishName} -- ${order.dishQuantity}`).join(', ');
  }
  onSubmit() {
    this.generateOrderDetails(); // Generate order details string before submitting

    const orderData = {
      name: this.name,
      email: this.email,
      address: this.address,
      phone: this.phone,
      totalMoney: this.totalAmount,
      cardNo: this.cardNo,
      orderDetails: this.orderDetails
    };

    console.log('orderData to be sent:', orderData); // Check if the order data looks correct

    this.http.post('http://localhost:9000/createDelivery', orderData)
      .subscribe(
        (response) => {
          console.log('Data posted successfully', response);
          alert('Data Posted successfully');
          window.location.reload();
        },
        (error) => {
          console.error('Error posting data:', error);
          // Output the error details to the console for debugging
        }
      );
  }

}