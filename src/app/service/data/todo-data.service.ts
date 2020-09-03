import { TODO_JPA_API_URL, HW_URL, API_URL } from './../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../../list-todos/list-todos.component';
import { Assignment } from 'src/app/models/assignments';
import { TOKEN, AUTHENTICATED_USER } from '../basic-authentication.service';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllAssignments(username) {
    return this.http.get<Assignment[]>(`${HW_URL}/getAssignments/${username}`);
    //console.log("Execute Hello World Bean Service")
  }

  deleteTodo(username, id){
    return this.http.delete(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`);
  }

  retrieveTodo(username, id){
    return this.http.get<Todo>(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`);
  }

  updateTodo(username, id, todo){
    return this.http.put(
          `${TODO_JPA_API_URL}/users/${username}/todos/${id}`
                , todo);
  }

  createTodo(username, todo){
    return this.http.post(
              `${TODO_JPA_API_URL}/users/${username}/todos`
                , todo);
  }
  createAssignmentAndRegister(assigment){
    return this.http.post<any>(
      `${API_URL}/createAssignmentAndRegister`,
      assigment
      ).pipe(
        map(
          data => {
            debugger;
            sessionStorage.setItem(AUTHENTICATED_USER, data.tokenResponseDto.user.email);
            sessionStorage.setItem(TOKEN, `Bearer ${data.tokenResponseDto.token}`);
            return data;
          }
        )
      );
  }

  createAssignment(assigment){
    return this.http.post<any>(
      `${API_URL}/createAssignment`,
      assigment
      ).pipe(
        map(
          data => {
            debugger;
            console.log(data);
            return data;
          }
        )
      );
  }



}
