import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../types/task.inteface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}

  getAllTasks() {
    return this.http.get<Task[]>(this.baseUrl);
  }

  createTask(task: Task) {
    return this.http.post(`${this.baseUrl}`, task);
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
