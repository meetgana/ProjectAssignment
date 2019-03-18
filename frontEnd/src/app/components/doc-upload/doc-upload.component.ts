import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../users.service';
import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs/Observable';
import { File } from '../../file.model';

@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.css']
})
export class DocUploadComponent implements OnInit {

  files: File[];
  private url = 'http://localhost:4000/upload';
  public uploader: FileUploader;

  constructor(private UsersService: UsersService, private router: Router) { }

  ngOnInit() {
     this.uploader = new FileUploader({url: this.url});
     this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
     this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          console.log('ImageUpload:uploaded:', item, status, response);
          alert('File uploaded successfully');
      };

      this.showAllFiles();
  }

  showAllFiles() {
   this.UsersService.showFileNames().subscribe(response => {
     this.files = response;
    });
  }

  downloadFile(filename, contentType) {
    this.UsersService.downloadFile(filename, contentType).subscribe(
      (res) => {
        const file = new Blob([res.blob()], { type: contentType });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      }
    );
  }
}
