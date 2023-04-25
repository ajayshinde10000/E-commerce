import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(){
    let token = localStorage.getItem('token');
    token = token && JSON.parse(token);
    return token;
  }

  setToken(token:string){
    localStorage.setItem('token', JSON.stringify(token));
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

}
