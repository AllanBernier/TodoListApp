import { Component, signal,    } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <!-- Style login with bootstrap -->
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          @if(toggleSignin){
            <h2>Sign In</h2>
            <form [formGroup]="credentials" (ngSubmit)="login()">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" formControlName="email">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" formControlName="password">
              </div>
              <button type="submit" class="btn btn-primary">Sign In</button>
              <!-- button to toggle signin to signup -->
              <button type="button" class="btn btn-secondary" (click)="toggleSignin = false">Sign Up</button>
            </form>
          } @else {
            <h2>Sign Up</h2>
            <form [formGroup]="signupForm" (ngSubmit)="signup()">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" formControlName="email">
                @if(errors.passwordConfirmation){
                  <div class="alert alert-danger" role="alert">
                    {{errors.passwordConfirmation}}
                  </div>
                }

              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" formControlName="password">
              </div>
              <div class="form-group">
                <label for="password">Password Confirmation</label>
                <input type="password" class="form-control" id="password" formControlName="passwordConfirmation">
                <!-- error password confirmation -->
                @if(errors.passwordConfirmation){
                  <div class="alert alert-danger" role="alert">
                    {{errors.passwordConfirmation}}
                  </div>
                }
              
              </div>

              <button type="submit" class="btn btn-primary">Sign Up</button>
              <button type="button" class="btn btn-secondary" (click)="toggleSignin = true">Sign In</button>

            </form>
          }
      </div>
  </div>
`

})
export class LoginComponent {
  
  toggleSignin = true;

  credentials: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirmation: new FormControl('')
  });

  errors : { passwordConfirmation ?: string, email ?: string } = {};

  constructor(private authService: AuthService, private router: Router) {
    if (authService.isLoggedIn()) {
      router.navigate(['dashboard']);
    }
  }



  login(): void {
    this.authService.authenticate(this.credentials.value.email, this.credentials.value.password)
  }

  signup(): void {
    if (this.signupForm.value.password !== this.signupForm.value.passwordConfirmation || typeof this.signupForm.value.password !== 'string') {
      this.errors.passwordConfirmation = 'Passwords do not match';
      return;
    }
    if (typeof this.signupForm.value.email  != 'string'){
      this.errors.email = 'Email is not valid';
      return;
    }

    this.authService.signin(this.signupForm.value.email, this.signupForm.value.password)
  }

  // Redirect to dashboard if logged in
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }
}