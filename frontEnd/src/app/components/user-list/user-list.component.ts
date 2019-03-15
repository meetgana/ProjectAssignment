import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../user.model';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  //public userlist: User;
  //public userlist: User[] = [] as User[];
  userlist: User[];

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.fetchUsers();
}

   /*  this.usersService.getUsers().subscribe((users) => {
      console.log(users);
    });
    */

  fetchUsers () {
    this.usersService
    .getUsers()
    .subscribe(data => {
      console.log('Data requested..');
      console.log (data);
      this.userlist = data;
      console.log(this.userlist);
    });
  }


/*  addNewUser () {
    this.router.navigate(['/userRegister/']);
  }
*/
}
