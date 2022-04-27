import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor(private http: HttpClient, private userService : UserService) { }

  url = " https://d7y6e81tph.execute-api.us-east-1.amazonaws.com/dev"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  runCode(src : any){
    return this.http.post<any>(this.url+"/run",src, this.httpOptions);
  }

  getSubmissions(){
    return this.http.get(this.url+"/list?email="+this.userService.getUser().email);
  }

  saveSubmission(src : any){
    let payload = {code:src,email : this.userService.getUser().email}
    console.log(payload);
    
    return this.http.post<any>(this.url+"/save",payload, this.httpOptions);
  }
}
