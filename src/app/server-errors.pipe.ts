import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serverErrors'
})
export class ServerErrorsPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if(!value.hasOwnProperty('errors')) {
      return [value.message];
    }
    
    let messages = [],
        subject = value.errors;
    
    for (let key in subject) {
      messages.push(subject[key].message);
    }
    return messages;
  }
}
