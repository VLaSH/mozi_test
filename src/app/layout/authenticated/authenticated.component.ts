import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router/src/router';
import { MoodService } from 'app/services/mood.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css']
})
export class AuthenticatedComponent implements OnInit {
  errors: Object;
  mood: number;
  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private moodService: MoodService
  ) { }

  ngOnInit() {
    this.subscription = this.moodService.startSending()
                          .subscribe((result: any) => {
                            this.mood = result;
                            
                            setTimeout((timer) => {
                              this.mood = null;
                            }, 3000)
                          }, (error) => {
                            this.errors = error;
                          });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
    this.moodService.stopSending();
    this.subscription.unsubscribe();
  }
}
