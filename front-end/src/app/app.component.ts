import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Bootstrap demo</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    </head>
    <body>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                @if (token !== null) {
                  <li class="btn"><a class="nav-link" routerLink="/login">Home</a></li>
                  <li class="btn"><a class="nav-link" (click)="logout()">Logout</a></li>
                } @else {
                  <li class="btn"><a class="nav-link" routerLink="/login">Signin</a></li>
                }
              </ul>
            </div>
          </div>
        </nav>
          <router-outlet></router-outlet>
    </body>
  </html>
  `,
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'front-end';
  token: string | null = null;
  private tokenSubscription: Subscription | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.tokenSubscription = this.authService.token.subscribe(token => {
      this.token = token;
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }
}
