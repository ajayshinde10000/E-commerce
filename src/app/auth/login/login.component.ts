import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/Interfaces/interfaces.module';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/user.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private _snackBar: MatSnackBar,private userService:UserService,private tokenService:TokenService) { 
    // let loginStatus = userService.user.isLogin;
    // if(loginStatus){
    //   router.navigate(['home/my-profile']);
    // }
   // let a = tokenService.getToken();
    if(tokenService.getToken()){
      router.navigate(['home/my-profile']);
    }
  }

  ngOnInit(): void {
  }

  login(data:Login){
      this.userService.login(data).subscribe((res:any)=>{
      console.log(res.user);
      this.tokenService.setToken(res.token);
      //localStorage.setItem('token', JSON.stringify(res.token));
      //this.userService.user = res.user;
      this.userService.userLoginTrue.next(true);
      this._snackBar.open('Login Successfull...','X',{duration:3000});
      this.router.navigate(['home/my-profile']);
    },
    (err)=>{
      console.log('User Not Found')
      this._snackBar.open('User Not Found Please Enter Valid Details','X',{duration:3000});
    })

    // let arr = localStorage.getItem('users') || '[]';
    // let b = JSON.parse(arr);
    // for(let user of b){
    //   if(user.email == data.email && user.password == data.password){
    //     user.isLogin = true;
    //     localStorage.setItem('users', JSON.stringify(b));
    //   }
    // }
    // console.log(data);
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
