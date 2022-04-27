import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: any;

  constructor(private fb : FormBuilder, private userService : UserService, private router : Router) {
    this.userForm = this.fb.group({
      email:["", Validators.required],
      username:["", Validators.required]
    })
   }

   get email(){
     return this.userForm.get('email');
   }

   get username(){
    return this.userForm.get('username');
  }
  
  
  ngOnInit(): void {
  }


  onSubmit(){
    console.log(this.userForm.value);
    this.userService.getOrAddUser(this.userForm.value)
      .subscribe((data:any)=>{
          this.userService.setUser({username : data.name , email : data.email})
          this.router.navigate(['/compiler']);
        }
      )    
  }
}
