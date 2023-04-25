import { Injectable } from '@angular/core';
import { Register, User, Login } from '../Interfaces/interfaces.module';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoginTrue = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient,private tokenService:TokenService) {
      // let arr = localStorage.getItem('users') || '[]';
      // let userArray = JSON.parse(arr);
      // for(let user of userArray){
      //   if(user.isLogin){
      //     this.userLoginTrue.next(true);
      //   }
      // }

      if(tokenService.getToken()){
        this.userLoginTrue.next(true);
        //console.log("User From Service",this.user)
      }
  }
  
  user:any = {}

  login(data:Login){
    let url = "https://shop-api.ngminds.com/auth/login?captcha=false";
    return this.http.post(url,data);
  }

  register(data:any){

   // let t = localStorage.getItem('token');
    //let header = new HttpHeaders({'Content-Type': 'application/json','Authorization': "Bearer "+t})
    let url = "https://shop-api.ngminds.com/auth/register?captcha=false";

    // var header = new HttpHeaders();
    // header.append('Content-Type', 'application/json');
    // header.append("Authorization", "Bearer " + t);

    //     const httpOptions = {
    //       headers: header
    //     };

    return this.http.post(url,data);
  }

  getUser(){
    //let t = JSON.parse(localStorage.getItem('token') || '');

    let token = this.tokenService.getToken();

    let url = "https://shop-api.ngminds.com/auth/self";
       const httpOptions = {
          headers: new HttpHeaders({ 
            'Content-Type':'application/json',
            'Authorization': `bearer ${token}`
          })
        };
        return this.http.get(url,httpOptions)
       
  }

  
}
