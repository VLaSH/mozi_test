import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {  
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(params) {
    return this.http.post('/api/session', params)
            .map((response) => {
              localStorage.setItem('access_token', response['access_token']);
              
              return response['access_token'];
            });
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
