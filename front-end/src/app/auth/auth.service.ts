import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001';
  public token: string ='';


  constructor(private http: HttpClient) {
    
  }
  signin(username: string, password: string): Observable<any> {
    const data = { username, password };
    return this.http.post(`${this.apiUrl}/signin`, data);
  }
 
  authenticate(email: string, password: string): Observable<any> {
    const data = { email, password };
    console.log(data)
    return this.http.post(`${this.apiUrl}/authenticate`, data)
      .pipe(
        tap((response:any) => {
          this.token = response.token; // Store the received token 
          localStorage.setItem('token',this.token)
          console.log(this.token)
        })
      );
  }
  profile(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.apiUrl}/me`,{ headers });
  }
  private createHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (this.token) {
      headers = headers.append('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }
  logout(): void {
    
    localStorage.removeItem('token');
  }
 
  
}
