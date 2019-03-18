import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { RegSuccessComponent } from './components/reg-success/reg-success.component';
import { DocUploadComponent } from './components/doc-upload/doc-upload.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FileSelectDirective } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload';


const routes: Routes = [
  { path: 'userList', component: UserListComponent},
  { path: 'userRegister', component: UserRegisterComponent},
  { path: 'regSuccess', component: RegSuccessComponent, data: {firstName :'firstname', lastName:'lastname'}},
  { path: 'docUpload', component: DocUploadComponent},
  { path: '', redirectTo: '/userList', pathMatch: 'full'}
];

//   { path: '**', redirectTo: '/userList', pathMatch: 'full'}
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserRegisterComponent,
    RegSuccessComponent,
    DocUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
