import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Post } from '../post/post.model';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [ UserService ],

})
export class RegistrationComponent implements OnInit {
    new_user: User;
    registrationForm: FormGroup;

    regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  constructor(private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit() {
      this.new_user = new User;
      this.new_user.email = '';
      this.new_user.password = '';

      this.buildRegistrationForm();
  }


  buildRegistrationForm(){
      this.registrationForm = this.fb.group({
          'email': ['', [
          Validators.required,
          Validators.pattern(this.regexEmail)
          ]],
          'password':['', [
          Validators.required,
          Validators.minLength(8)
          ]],
          'confirm_password': ['', [
          Validators.required,
          Validators.minLength(8)
          ]]
      })
  } 

  registerUser(){

      if(this.registrationForm.get('password').value != this.registrationForm.get('confirm_password').value){
          alert('Please, retype password');
          return false;
      }
      this.new_user.email = this.registrationForm.value.email;
      this.new_user.password = this.registrationForm.value.password;

      this.userService.registerUser(this.new_user);

      alert('Success registration! Please, login!');

  }


}
