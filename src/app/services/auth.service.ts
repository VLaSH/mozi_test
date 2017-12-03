import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router/src/router';

@Injectable()
export class AuthService {  
  constructor(
    private http: Http,
    private router: Router
  ) { }

  login(params) {
    return this.http.post('/api/session', params)
            .map((response: Response) => {
              localStorage.setItem('access_token', response.json()['access_token']);
              localStorage.setItem('current_user', response.json()['id'])
              
              return response.json()['access_token'];
            });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
  }
}
