import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  url = "https://jsonplaceholder.typicode.com/users?id=1"
  user : any = null;

  getOrAddUser(userForm:any){
    return this.http.get(this.url);
  }

  setUser(user:any){
    this.user = user;
  }

  getUser(){
    return this.user;
  }

  hasUser(){
    return this.user == null ? false : true;
  }

  clearUser(){
    this.user = null;
  }

}
