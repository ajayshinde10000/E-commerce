import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(){
    let token = localStorage.getItem('token');
    
    try{
      token = token && JSON.parse(token);
      return token;
    }catch(err){
      localStorage.removeItem('token');
      return false;
    }
    //return token;
  }

  setToken(token:string){
    localStorage.setItem('token', JSON.stringify(token));
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  getHeader(){
    let token = this.getToken();

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type':'application/json',
        'Authorization': `bearer ${token}`
      })
    };

    return httpOptions;
  }

}
