import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { environment } from 'environments/environment';
import { JWT } from 'app/utils/jwt';

@Injectable()
export class MoodService {
  private socket: any;
  private intervalSubscription: Subscription;

  constructor() { }

  startSending() {
    let token = JWT.getAuthToken();

    this.socket = io(environment.SOCKET_HOST, { path: '/socket', transportOptions: {
      polling: {
        extraHeaders: {
          'authorization': `Bearer ${JWT.getAuthToken()}`
        }
      }
    } });
    
    this.intervalSubscription = Observable.interval(5000)
                                  .subscribe((num) => {
                                    this.socket.emit('mood', {
                                      moodValue: this.generateMood()
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
}
