import { Component, ElementRef, ViewChild,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sphere-app';
  constructor(public userService : UserService, public router : Router){}
  logout(){
   this.userService.clearUser();
   this.router.navigate(['/']);
  }
}
