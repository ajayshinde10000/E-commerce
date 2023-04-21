import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router:Router,private userService:UserService){}

  ngOnInit(): void {
    let arr = localStorage.getItem('users') || '[]';
    let b = JSON.parse(arr);
    for(let user of b){
      if(user.isLogin){
        this.userService.user = user;
        this.router.navigate(['home/my-profile']);
        return;
      }
    }
   this.router.navigate(['auth/login']);
  }
  title = 'E-Commerce';

}
