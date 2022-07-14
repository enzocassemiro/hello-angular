import { Component, OnInit } from '@angular/core';
import { Task } from '../core/models/task.model';
import * as uuid from 'uuid';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  taskName: string = '';

  todoItems: Task[] = [
    {
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
    },
  ];

  addTask(): void {
    this.todoItems.push({
      id: uuid.v4(),
      name: this.taskName,
      isDone: false,
      editable: false
    })
    this.taskName=''
  }

  deleteTask(task: Task): void {
    const question = confirm('Are you sure you want to delete this task?')
    if (question) {
      let index = this.todoItems.indexOf(task);
      this.todoItems.splice(index, 1);
    }
  }

  completeTask(task: Task): void {
    if (task.editable) {
      alert('You cannot complete a task while editing it.')
      return
    }
    if (!task.isDone) {
      task.isDone = !task.isDone
      return
    }
    task.isDone = !task.isDone
  }

  editTask(task: Task): void {
    if (!task.isDone) {
      task.editable = !task.editable
      return
    }
    alert('You cannot edit a completed task')
  }
}
