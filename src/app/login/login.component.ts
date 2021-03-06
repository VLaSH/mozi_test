import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { EmailValidator } from 'app/validators/email.validator';
import { Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { LoginModel } from 'app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 
  loginForm: FormGroup;
  errors: Object;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = fb.group(new LoginModel())
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    if(this.loginForm.invalid) {
      this.errors = { message: 'Please fill required fields' };
      return false;
    }
    
    this.authService.login(value)
      .subscribe(result => {
        this.router.navigate(['/user-details']);
      }, response => {
        this.errors = response.error;
      })
  }
}
