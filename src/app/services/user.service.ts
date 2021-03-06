import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router : Router) {
    let user = sessionStorage.getItem('user')

    if(user)
      this.user = JSON.parse(user);
      router.navigate(["/compiler"]);
    }
  url = " https://d7y6e81tph.execute-api.us-east-1.amazonaws.com/dev"
  user : any = null;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  getOrAddUser(userForm:any){
    return this.http.post<any>(`${this.url}/login`,{name:userForm.username, email:userForm.email},this.httpOptions);
  }

  setUser(user:any){
    this.user = user;
    sessionStorage.setItem('user',JSON.stringify(this.user));
  }

  getUser(){
    return this.user;
  }

  hasUser(){
    return this.user == null ? false : true;
  }

  clearUser(){
    sessionStorage.removeItem('user');
    this.user = null;
  }

}
