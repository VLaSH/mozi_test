import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  
  // Get all posts from the API
  create(params) {
    return this.http.post('/api/users', params)
            .map((response) => {
              localStorage.setItem('access_token', response['access_token'])
              return response;
            });
  }

  get() {
    return this.http.get(`/api/users`)
            .map((response) => {
              return response;
            })
  }
}