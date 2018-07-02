import { Component,  EventEmitter, Input, Output, OnInit  } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  //inputs:['selectedUser']
})

export class UserComponent implements OnInit {

  @Input()  selectedUser: User;
  @Output() notifyChange = new EventEmitter<boolean>();


  constructor() {
  }

  ngOnInit() {
  }

  onUserChange() {
    console.log('Change registered');
    this.notifyChange.emit(true);
  }

}
