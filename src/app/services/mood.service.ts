import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { environment } from 'environments/environment';

@Injectable()
export class MoodService {
  private socket: any;
  private intervalSubscription: Subscription;

  constructor() { }

  startSending() {
    this.socket = io(environment.SOCKET_HOST, { path: '/socket' });
    
    this.intervalSubscription = Observable.interval(5000)
                                  .subscribe((num) => {
                                    this.socket.emit('mood', {
                                      moodValue: this.generateMood(),
                                      userId: this.getUserId()
                                    });
                                  });

    return Observable.fromEvent(this.socket, 'mood')
            .map((response: any) => {
              if(response.status === 'error') {
                throw response.message;
              }
              
              return response.message;
            });
  }

  stopSending() {
    this.intervalSubscription.unsubscribe();
  }

  private generateMood() {
    return Math.floor(Math.random() * (100 - 0 + 1)) + 0;
  }

  private getUserId() {
    return localStorage.getItem('current_user');
  }
}
