import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor(private http: HttpClient) { }

  url = "https://sphere.free.beeceptor.com"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

  runCode(src : any){
    return this.http.post(this.url,src, this.httpOptions);
  }

  getSubmissions(){
    return this.http.get(this.url);
  }
}
