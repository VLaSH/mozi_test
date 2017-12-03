import { Validators, FormControl } from "@angular/forms";

export class LoginModel {
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
}