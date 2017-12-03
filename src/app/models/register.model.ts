import { Validators, FormControl } from "@angular/forms";
import { EmailValidator } from '../validators/email.validator';

export class RegisterModel {
  name = new FormControl('', Validators.required);
  email = new FormControl('', Validators.compose([Validators.required, EmailValidator.emailFormat]));
  age = new FormControl(1, Validators.required);
  password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]));
}
// export class RegisterModel {
//   name = new FormControl('');
//   email = new FormControl('');
//   age = new FormControl(1);
//   password = new FormControl('');
// }