import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User} from './user.model';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

    constructor(private router: Router) {}



    registerUser(user: User): boolean {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/login']);
        return true;
    }


    loginUser(user: User): boolean{
        let userFromStorage = JSON.parse(localStorage.getItem("user"));

        if (!userFromStorage) return false;

        if( (user.email == userFromStorage.email) && 
            (user.password == userFromStorage.password) ){
            this.router.navigate(['/post']);
            return true;
        }

        alert('Wrong email or password. Remember: you must register first!');
        return false;
    }

    clearLocalStorage(): boolean{
       localStorage.clear();
       return true;
    }


    getCurrentUser():any{
        return JSON.parse(localStorage.getItem("user"));
    }




}
