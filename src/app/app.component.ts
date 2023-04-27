import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './Services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router:Router,private userService:UserService){
    
  }


  @ViewChild('page') page!:ElementRef;

  @ViewChildren('page') parent!: QueryList<any>;

 

  arr = [1,2,3];
  ngOnInit(): void {
    // let arr = localStorage.getItem('users') || '[]';
    // let b = JSON.parse(arr);
    // for(let user of b){
    //   if(user.isLogin){
    //     this.userService.user = user;
    //     this.router.navigate(['home/my-profile']);
    //     return;
    //   }
    // }

   
    let arr = localStorage.getItem('token');
    if(arr){
      this.router.navigate(['home/my-profile']);
      return;
    }

   this.router.navigate(['auth/login']);
  }
  title = 'E-Commerce';

  update(ind:any){
    alert(ind)
  }

  getData(){
    let arr2 = this.parent.toArray();
    console.log(arr2);
  }

 
}
