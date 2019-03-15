import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../users.service';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  createForm: FormGroup;

  constructor(private UsersService: UsersService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      ssoId: ['', Validators.required]
    });
   }

   addUser(firstName, lastName, email, ssoId) {
    this.UsersService.addUser(firstName, lastName, email, ssoId).subscribe(() => {
      
    });

    this.router.navigate(["regSuccess", {firstname: firstName, lastname: lastName}]);
  }

  ngOnInit() {
  }

}
