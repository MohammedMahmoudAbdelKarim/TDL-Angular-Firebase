import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges().subscribe(itme => {
      this.toDoListArray = [];
      itme.forEach(element => {
        var ele = element.payload.toJSON();
        ele["$key"] = element.key;
        this.toDoListArray.push(ele);
      })
      this.toDoListArray.sort((a, b) => {
        return a.isChecked - b.isChecked;
      })
    })
  }
  onAdd(itemTitle) {
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }
  alertCheck($key: string, isChecked: boolean) {
    this.toDoService.checkOrUncheckTitle($key, !isChecked)
  }
  onDelete($key: string) {
    this.toDoService.removeTitle($key);
  }
}
