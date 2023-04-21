import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private userService:UserService) {
        userService.userLoginTrue.subscribe((data)=>{
          this.isLogin = data;
        })
   }

  ngOnInit(): void {
  }
  isLogin:boolean = false;

  logout(){
    this.userService.userLoginTrue.next(false);
    let arr = localStorage.getItem('users') || '[]';
    let userArr = JSON.parse(arr);
    for(let user of userArr) {
      if(this.userService.user.email == user.email){
        user.isLogin = false;
        localStorage.setItem('users',JSON.stringify(userArr));
      }
    }
    this.router.navigate(['auth/login']);
  }

}
