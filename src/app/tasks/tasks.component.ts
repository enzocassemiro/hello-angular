import { Component, OnInit } from '@angular/core';
import { Task } from '../core/models/task.model';
import * as uuid from 'uuid';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  taskName: string = '';
  todoItems: Task[] = [];

  constructor() { }

  ngOnInit(): void {
    const alreadyLogin: string | null = localStorage.getItem('firstLogin')
    if (!alreadyLogin) {
      window.localStorage.setItem('firstLogin', String(Date.now()));
      this.todoItems.push({
        id: uuid.v4(),
        name: 'Example - Not Done',
        isDone: false,
        editable: false,
      },
      {
        id: uuid.v4(),
        name: 'Example - Done',
        isDone: true,
        editable: false,
      })
    }
    
    this.renderLocalStorage();
  }

  renderLocalStorage(): void {
    Object.keys(localStorage).forEach((element): void => {
      if (element != 'firstLogin') {
        const elementObject: Task = JSON.parse(localStorage.getItem(element)!);
        this.todoItems.push(elementObject)
      }
    });
  }

  addTask(): void {
    const taskCreated: Task = {
      id: uuid.v4(),
      name: this.taskName,
      isDone: false,
      editable: false
    }
    this.todoItems.push(taskCreated)
    window.localStorage.setItem(taskCreated.id, JSON.stringify(taskCreated));
    this.taskName='';
  }
  
  deleteTask(task: Task): void {
    const question = confirm('Are you sure you want to delete this task?')
    if (question) {
      let index = this.todoItems.indexOf(task);
      this.todoItems.splice(index, 1);
      window.localStorage.removeItem(task.id);
    }
  }
  
  completeTask(task: Task): void {
    if (task.editable) {
      alert('You cannot complete a task while editing it.')
      return
    }
    if (!task.isDone) {
      task.isDone = !task.isDone
      window.localStorage.setItem(task.id, JSON.stringify(task));
      return
    }
    task.isDone = !task.isDone
    window.localStorage.setItem(task.id, JSON.stringify(task));
  }
  
  editTask(task: Task): void {
    if (!task.isDone) {
      task.editable = !task.editable
      window.localStorage.setItem(task.id, JSON.stringify(task));
      return
    }
    alert('You cannot edit a completed task')
  }
}
