import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('/api/users');
  }

  deleteUser(id) {
    return this.http.delete(`/api/user/${id}`);
  }

  updateUser(id, user) {
    return this.http.put(`/api/user/${id}`, user, httpOptions);
  }

  createUser(user) {
    return this.http.post('/api/user', user, httpOptions);
  }  
  

}
