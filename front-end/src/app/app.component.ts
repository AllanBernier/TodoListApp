import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatButtonModule],
  template: `
    <main class="flex flex-col h-screen">
      <nav class="h-24 bg-slate-950 flex pl-4 gap-2 border-b border-gray-500">
          @if (token !== null) {
            <a mat-raised-button color="primary" class="self-center" routerLink="/login">Home</a>
            <a mat-raised-button color="accent" class="self-center" (click)="logout()">Logout</a>
          } @else {
            <a mat-raised-button color="accent" class="self-center" routerLink="/login">Signin</a>
          }
      </nav>

      <router-outlet></router-outlet>
      </main>
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
