import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { User } from '../user/user.model';
import { UserService } from '../user/user.service';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [ UserService ],

})
export class LoginComponent implements OnInit {
    current_user: User;
    loginForm: FormGroup;

    regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;




    constructor(private fb: FormBuilder,
                private userService: UserService) { }

    ngOnInit() {
        this.buildLoginForm();
    }

    buildLoginForm(){
        this.loginForm = this.fb.group({
            'email': ['', [
            Validators.required,
            Validators.pattern(this.regexEmail)
            ]],
            'password':['', [
            Validators.required,
            Validators.minLength(8)
            ]]
        })
    } 


    loginUser(){
        this.userService.loginUser(this.loginForm.value);
    }

    clearLocalStorage(){
        this.userService.clearLocalStorage();
    }

}
