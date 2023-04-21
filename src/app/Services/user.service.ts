import { Injectable } from '@angular/core';
import { Register, User } from '../Interfaces/interfaces.module';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoginTrue = new BehaviorSubject<boolean>(false);

  constructor() {
      let arr = localStorage.getItem('users') || '[]';
      let userArray = JSON.parse(arr);
      for(let user of userArray){
        if(user.isLogin){
          this.userLoginTrue.next(true);
        }
      }
  }
  user:Register = {
    name: '',
    email: '',
    password: '',
    companyName: '',
    isLogin: false,
    isEmailVerified: false,
    role: ''
  }
}
