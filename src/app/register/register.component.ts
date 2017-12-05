import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../validators/email.validator';
import { UserService } from 'app/services/user.service';
import { Router } from '@angular/router';
import { RegisterModel } from 'app/models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  requestInProgress: boolean = false;
  errors: Object;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = fb.group(new RegisterModel())
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    if(this.registerForm.invalid) {
      this.errors = { message: 'Please fill required fields' };
      return false;
    }

    this.userService.create(value).subscribe(result => {
      this.router.navigate(['/login']);
    }, response => {
      this.errors = response.error;
    })
  }
}
