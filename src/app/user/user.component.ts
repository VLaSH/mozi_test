import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any = {};

  constructor(private userService: UserService) {    
    userService.get()
      .subscribe(result => {
        this.user = result;
      });
  }

  ngOnInit() {
  }
}
