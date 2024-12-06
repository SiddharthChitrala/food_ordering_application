import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {
  dishName: string = '';
  description: string = '';
  price: number | string = '';
  selectedImage: File | null = null;
  dishes: any[] = [];
  selectedDish: any | null = null;

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

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    formData.append('dishName', this.dishName);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());

    if (this.selectedDish) {
      // If a dish is selected, update it
      this.http.put(`http://localhost:9000/dishes/${this.selectedDish._id}`, formData)
        .subscribe((response: any) => {
          console.log('Dish updated successfully');
          this.selectedDish = null; // Clear selectedDish after update
          this.getDishes();
        }, error => {
          console.error('Dish update failed', error);
        });
    } else {
      // If no dish is selected, create a new one
      this.http.post('http://localhost:9000/upload-dish', formData)
        .subscribe((response: any) => {
          console.log('Dish uploaded successfully');
          this.getDishes();
        }, error => {
          console.error('Dish upload failed', error);
        });
    }
  }

  selectDishForEdit(dish: any) {
    this.selectedDish = dish;
    this.dishName = dish.dishName;
    this.description = dish.description;
    this.price = dish.price;
    // You can also set the image if needed
  }

  deleteDish(dishId: string) {
    this.http.delete(`http://localhost:9000/dishes/${dishId}`)
      .subscribe(() => {
        console.log('Dish deleted successfully');
        this.getDishes();
      }, error => {
        console.error('Dish deletion failed', error);
      });
  }
}
