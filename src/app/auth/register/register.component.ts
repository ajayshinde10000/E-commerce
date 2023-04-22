import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/Interfaces/interfaces.module';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/user.service';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router,private _snackBar: MatSnackBar,private userService:UserService) { 
    let loginStatus = userService.user.isLogin;
    if(loginStatus){
      router.navigate(['home/my-profile']);
    }
  }

  ngOnInit(): void {
  }
  selectedValue: string | undefined;

  role: Role[] = [
    {value: 'user', viewValue: 'user'},
    {value: 'Admin', viewValue: 'Admin'},
  ];

  isValidName:boolean = true;

  register(formData:NgForm){
    if(this.checkName(formData.value.name) && formData.valid && this.checkUserExist(formData.value.email,formData.value.password) && this.selectedValue){
      let arr = localStorage.getItem('users') || '[]';
      let userArr = JSON.parse(arr);
      let obj:Register={
        name: formData.value.name,
        email: formData.value.email,
        password: formData.value.password,
        companyName: formData.value.companyName,
        isLogin: false,
        isEmailVerified:false,
        role: this.selectedValue
      }
      userArr.push(obj);
      localStorage.setItem('users',JSON.stringify(userArr));
      console.log(obj);
      this._snackBar.open('Registration Successfull...','X',{duration:2000});
      this.router.navigate(['auth/login']);
    }
    else if(!this.checkUserExist(formData.value.email,formData.value.password)){
      this._snackBar.open('Please Enter Valid Details User Already Exist...','X',{duration:2000});
    }
    else if(!this.selectedValue){
      this._snackBar.open('Please Select Role...','X',{duration:2000});
    }
    else{
      this._snackBar.open('Enter Valid User Details...','X',{duration:2000});
    }
    //console.log(data);
  }

  checkName(name:string){
    if(name==""){
      this.isValidName = false;
      return false;
    }
      for(let i=0;i<name.length;i++){
        if(name.charAt(i)!=' ' && name.charAt(i)<'A' || name.charAt(i)>'z'){
          this.isValidName = false;
          return false;
        }
      }
      this.isValidName = true;
      return true;
  }

  checkUserExist(email:string, password:string){
    let arr = localStorage.getItem('users') || '[]';
    let b = JSON.parse(arr);
    for(let user of b){
        if(user.email == email || user.password == password){
          return false;
        }
    }
    return true;
  }

  goToLogin(){
      this.router.navigate(['auth/login']);
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
