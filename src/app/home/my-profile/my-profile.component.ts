import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApiUser } from 'src/app/Interfaces/interfaces.module';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private router:Router,private userService:UserService,private _snackBar: MatSnackBar) {
   
   }

  ngOnInit(): void {
      this.getUser();
      // this.name = this.userService.user.name;
      // this.email = this.userService.user.email;
      // this.companyName = this.userService.user._org.name;
      // this.role = this.userService.user.role;
      console.log('User Logged In');
      // console.log(this.name);
      // this.userService.getUser();
    
  }

  isLoadingData:boolean = true;

  user:ApiUser={
    _id: '',
    name: '',
    _org: {
      id: '',
      name: '',
      email: ''
    },
    email: '',
    role: '',
    isEmailVerified: false,
    deleted: false,
    createdAt: undefined,
    updatedAt: undefined
  }


   async getUser(){
    await this.userService.getUser().subscribe((res:any)=>{
      console.log(res);
      this.user = res;
      this.isLoadingData = false;
    },(err)=>{
      this.router.navigate(['auth/login']);
    });
  }

  isEdit:boolean = true;

  name!:string;
  email!:string;
  role:any;
  password!:string;

  // logout(){
  //   let arr = localStorage.getItem('users') || '[]';
  //   let userArr = JSON.parse(arr);
  //   for(let user of userArr){
  //     if(user.email === this.userService.user.email){
  //       user.isLogin = false;
  //       localStorage.setItem('users',JSON.stringify(userArr));
  //     }
  //   }
  //   console.log(this.userService.user);
  //   this.router.navigate(['auth/login'])
  // }

  edit(){
    // this.userService.getUser().subscribe((data:any)=>{
    //   this.user = data;
    //   console.log(this.myUser);
    //   this.name = data.name;
    //   this.email = data.email;
    // })
    this.name = this.user.name;
    this.email = this.user.email;
    this.isEdit = false;
  }

  isRoleValid:boolean = true;

  editProfile(){
    // this.role = this.role.trim();
    // if(this.checkName(this.name) && this.role == 'user' || this.role == 'Admin'){
    //   let arr = localStorage.getItem('users') || '[]';
    //   let userArray = JSON.parse(arr);
    //   for(let user of userArray){
    //     if(user.email == this.email){
    //       user.name = this.name;
    //       user.role = this.role;
    //       user.companyName = this.companyName;
    //       this.isEdit = true;
    //       this.isValidName = false;
    //       localStorage.setItem('users', JSON.stringify(userArray));
    //       this._snackBar.open('Profile Updated Successfully','X',{duration:3000})
    //       return;
    //     }
    //   }
    // }
    // else{
    //   this.isRoleValid = false;
    //   this._snackBar.open('Please Enter Valid Details','X',{duration:3000})
    // }

    let obj = {
      name:this.name,
      email:this.email,
      password:this.password
    };

    let userId = this.user._id;

    this.userService.updateUserInfo(obj,userId).subscribe((data:any)=>{
      this.user = data;
      this.isEdit = true;
      this.password="";
    })

  }

  eidtRoleByDropdown(data:any){
    console.log(data);
    this.role=data;
  }

  isValidName:boolean = false;
  
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

cancelEditProfile(){
  this.isEdit = true;
}
passVisible:string = 'password';

toggleImg(){
  if(this.passVisible == 'password'){
    this.passVisible = 'text';
  }
  else{
    this.passVisible = 'password';
  }
}

}
