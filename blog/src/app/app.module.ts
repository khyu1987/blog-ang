import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';









import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { CommentComponent } from './post/comment/comment.component';
import { PostService } from './post/post.service';
import { UserService } from './user/user.service';


const appRoutes: Routes = [
{ 
  path: 'admin',
  component: AdminComponent 
},

{ 
  path: 'login',
  component: LoginComponent
},

{ 
  path: 'registration',
  component: RegistrationComponent
},

{
  path: 'post',
  component: PostComponent
},

{ path: '',
redirectTo: '/login',
pathMatch: 'full'
},

{ path: '**', component: LoginComponent }
];


@NgModule({
  declarations: [
  AppComponent,
  PostComponent,
  LoginComponent,
  AdminComponent,
  RegistrationComponent,
  UserComponent,
  CommentComponent
  ],
  imports: [
  BrowserModule,
  RouterModule.forRoot( appRoutes ),
  ReactiveFormsModule,
  HttpClientModule,
  HttpModule,
  FormsModule,
  ],
  providers: [
  PostService,
  UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
