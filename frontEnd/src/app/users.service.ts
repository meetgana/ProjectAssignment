import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user.model';
import { File } from './file.model';

@Injectable ({
  providedIn: 'root'
})

export class UsersService {

  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  getUsers () {
    return this.http.get<User[]>(`${this.uri}/users`);
  }

  getUsersById (id) {
    return this.http.get(`${this.uri}/users/${id}`);
  }

  addUser (firstName, lastName, email, ssoId) {
    const users = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      ssoId: ssoId
    }
    console.log ("Values passed from html");
    console.log (firstName, lastName, email, ssoId);
    return this.http.post(`${this.uri}/users/add`, users);
  }

  downloadFile(filename, filetype): any {
    return this.http.get("${this.uri}/file/" + filename,
    { responseType: 'blob' });
  }

  showFileNames() {
    return this.http.get<File[]>(`${this.uri}/files/`);
  }
}
