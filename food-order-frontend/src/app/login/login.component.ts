import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


interface ApiResponse {
  message: string;
  role: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin: boolean = true;
  email: string = '';
  password: string = '';
  username: string = '';
  role: number = 0;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() { }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  register(): void {
    this.http.post<ApiResponse>('http://localhost:9000/register', {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Registration error:', error);
        if (error.status === 401) {
          return throwError('Registration failed: Invalid credentials');
        } else {
          return throwError('Registration failed: An error occurred');
        }
      })
    ).subscribe(
      response => {
        console.log(response.message);
        if (response.role === 0) {
          this.router.navigate(['/user-dashboard']);
        } else if (response.role === 1) {
          this.router.navigate(['/admin-dashboard']);
        } else if (response.role === 2) {
          this.router.navigate(['/delivery-dashboard']);
        }
      }
    );
  }

  login(): void {
    this.http.post<ApiResponse>('http://localhost:9000/login', {
      email: this.email,
      password: this.password
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Login error:', error);
        if (error.status === 401) {
          if (error.error === 'Invalid password') {
            return throwError('Login failed: The password you entered is incorrect. Please try again.');
          } else if (error.error === 'User not found') {
            return throwError('Login failed: User not found. Please check your email and try again.');
          } else {
            return throwError('Login failed: Invalid credentials');
          }
        } else {
          return throwError(`Login failed: ${error.error.message || 'An error occurred'}`);
        }
      })
    ).subscribe(
      response => {
        console.log('API Response:', response);
        console.log(response.message);
        console.log('User role:', response.role);
  
        if (typeof response.role === 'number') {
          if (response.role === 0) {
            this.router.navigate(['/user-dashboard']);
          } else if (response.role === 1) {
            this.router.navigate(['/admin-dashboard']);
          } else if (response.role === 2) {
            this.router.navigate(['/delivery-dashboard']);
          } else {
            console.error('Invalid user role:', response.role);
          }
        } else {
          console.error('Invalid role data:', response.role);
        }
      },
      error => {
        console.error('Login failed:', error);
     
      }
    );
  }
  
}
