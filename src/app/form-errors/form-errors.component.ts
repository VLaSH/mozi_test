import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.css']
})
export class FormErrorsComponent implements OnInit {
  @Input() fieldName: string;
  @Input() fieldControl: FormControl;
  
  constructor() { }

  ngOnInit() {
  }

  errorMessages() {
    for(let error in this.fieldControl.errors) {
      switch(error) {
        case 'required':
          return `${this.fieldName} is required`
        case 'emailFormat':
          return `${this.fieldName} format is invalid`;
        case 'minlength':
          return `The minimum length of ${this.fieldName} should be ${this.fieldControl.errors['minlength'].requiredLength}`
        default:
          return 'Undefined error';
      }
    }
  }
}
