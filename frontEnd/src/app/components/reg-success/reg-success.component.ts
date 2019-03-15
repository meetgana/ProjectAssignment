import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-reg-success',
  templateUrl: './reg-success.component.html',
  styleUrls: ['./reg-success.component.css']
})
export class RegSuccessComponent implements OnInit {
  firstName: any;
  lastName: any;
  constructor(private UsersService: UsersService, private router: Router, 
              private Activatedroute: ActivatedRoute, private RouterModule: RouterModule) { }

  ngOnInit() {
    this.Activatedroute.params.subscribe(params => {
      this.firstName = params ['firstname'];
      this.lastName = params ['lastname'];
      console.log ("First Name: ", this.firstName);
      console.log ("Last Name: ", this.lastName);
      });
  }

}
