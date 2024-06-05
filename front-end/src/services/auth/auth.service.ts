import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001';
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  token = this.tokenSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    console.log("refresh")
  }


  getToken(): string | null {
    return this.tokenSubject.value;
  }
  setToken(token: string | null): void {
    if (token) {
      this.router.navigate(['dashboard']);
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    this.tokenSubject.next(token);
  }

  signin(email: string, password: string): void {
    const data = { email, password };
    this.http.post<{ token: string, id: string }>(`${this.apiUrl}/signup`, data).subscribe({
      next: (response) => {
        console.log(response);
        this.setToken(response.token);
        localStorage.setItem('id', response.id);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    })
  }

  authenticate(email: string, password: string): void {
    const data = { email, password };
    this.http.post<{ token: string, id: string }>(`${this.apiUrl}/authenticate`, data).subscribe({
      next: (response) => {
        this.setToken(response.token);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    })
  }

  profile(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.apiUrl}/me`, { headers });
  }

  createHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const token = localStorage.getItem('token');
    if (token !== null) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  logout(): void {
    this.setToken(null);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  fetchWithHeader<T>(endpoint: string, verbe: string, body?: any): Observable<T> {
    const headers = this.createHeaders();

    if (verbe == "POST") {
      return this.http.post<T>(`${this.apiUrl}${endpoint}`, body, { headers });
    } else if (verbe == "DELETE") {
      return this.http.delete<T>(`${this.apiUrl}${endpoint}`, { headers });
    } else if (verbe == "PUT") {
      if (body === undefined) {
        body = {}
      }
      return this.http.put<T>(`${this.apiUrl}${endpoint}`, body, { headers });
    }
    return this.http.get<T>(`${this.apiUrl}${endpoint}`, { headers });
  }
}
