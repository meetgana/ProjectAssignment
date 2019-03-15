import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.css']
})
export class DocUploadComponent implements OnInit {

  constructor(private UsersService: UsersService, private router: Router, 
    private Activatedroute: ActivatedRoute) {
      
     }

  ngOnInit() {
  }

}
