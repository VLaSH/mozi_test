import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http) { }
  
  // Get all posts from the API
  create(params) {
    return this.http.post('/api/users', params, this.jwt())
            .map((response: Response) => {
              localStorage.setItem('access_token', response.json()['access_token'])
              localStorage.setItem('current_user', response.json()['id'])
              return response.json();
            });
  }

  get(id) {
    return this.http.get(`/api/users/${id}`, this.jwt())
            .map((response: Response) => {
              return response.json();
            })
  }

  private jwt() {
    // create authorization header with jwt token
    let access_token = localStorage.getItem('access_token');
    if (access_token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + access_token });
      return new RequestOptions({ headers: headers });
    }
  }
}