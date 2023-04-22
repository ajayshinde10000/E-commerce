import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/Interfaces/interfaces.module';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private _snackBar: MatSnackBar,private userService:UserService) { 
    let loginStatus = userService.user.isLogin;
    if(loginStatus){
      router.navigate(['home/my-profile']);
    }
  }

  ngOnInit(): void {
  }

  login(data:Login){
    let arr = localStorage.getItem('users') || '[]';
    let b = JSON.parse(arr);

    for(let user of b){
      if(user.email == data.email && user.password == data.password){
        user.isLogin = true;
        localStorage.setItem('users', JSON.stringify(b));
        this.userService.user = user;
        this.userService.userLoginTrue.next(true);
        this._snackBar.open('Login Successfull...','X',{duration:3000});
        this.router.navigate(['home/my-profile']);
        return;
      }
    }
    this._snackBar.open('User Not Found Please Enter Valid Details','X',{duration:3000});
    console.log(data);
  }

  goToRegister(){
      this.router.navigate(['auth/register'])
  }
  forgetPass(){
    alert('Forget Password Works');
  }

  passVisible:string = 'password';

  toggleImg(){
    if(this.passVisible=='password'){
      this.passVisible = 'text'
    }
    else{
      this.passVisible = 'password'
    }
  }
}
