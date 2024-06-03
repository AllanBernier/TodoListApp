import { Component, signal,    } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  template: `
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    @if(toggleSignin){
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>

      <form [formGroup]="credentials" (ngSubmit)="login()" class="w-full">
        <mat-form-field class="w-full">
          <mat-label>Email</mat-label>
          <input type="email" 
            matInput 
            formControlName="email" 
            class="w-full"
            placeholder="Ex. pat@example.com">
          <!-- <mat-hint>Errors appear instantly!</mat-hint> -->
        </mat-form-field>
      
        <mat-form-field class="w-full">
          <mat-label>Password</mat-label>
          <input type="password" 
            matInput 
            formControlName="password" 
            class="w-full">
        </mat-form-field>

        <div class="flex w-full gap-4">
          <button class="w-4/5" type="submit" mat-stroked-button color="accent">Sign In</button>
          <button type="button" class="btn btn-secondary" (click)="toggleSignin = false">Sign Up</button>
        </div>
      </form>
    } @else {
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create account</h2>
      
      <form [formGroup]="signupForm" (ngSubmit)="signup()" class="w-full">
        <mat-form-field class="w-full">
          <mat-label>Email</mat-label>
          <input type="email" 
            matInput 
            formControlName="email" 
            class="w-full"
            placeholder="Ex. pat@example.com">
          <!-- <mat-hint>Errors appear instantly!</mat-hint> -->
        </mat-form-field>

        <mat-form-field class="w-full">
          <mat-label>Password</mat-label>
          <input type="password" 
            matInput 
            formControlName="password" 
            class="w-full">
        </mat-form-field>

        <mat-form-field class="w-full">
          <mat-label>Confirmation</mat-label>
          <input type="password" 
            matInput 
            formControlName="passwordConfirmation" 
            class="w-full">
        </mat-form-field>

        <div class="flex w-full gap-4">
        <button class="w-4/5" type="submit" mat-stroked-button color="accent">Sign Up</button>
        <button type="button" class="btn btn-secondary" (click)="toggleSignin = true">Sign In</button>
        </div>
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