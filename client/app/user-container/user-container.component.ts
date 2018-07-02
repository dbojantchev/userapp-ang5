import { Component, Inject, NgModule, AfterViewInit, ViewChild } from '@angular/core';
import { MessageService } from '../message.service';
import { UsersService } from '../users.service';
import { User } from '../user/user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {HttpClient} from '@angular/common/http';

import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';

export interface DialogData {
  animal: string;
  name: string;
}

@NgModule({

  imports: [
    MatTableDataSource
  ],

  exports: [
    MatTableDataSource
  ]
})

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.css']
})
export class UserContainerComponent implements AfterViewInit {

  users: User[];
  selectedUser: User;
  saveEditMode;

  userDetail = {
    fname: '',
    lname: '',
    age: undefined,
    notes: ''
  };

  displayedColumns = ['id', 'fname', 'lname','age','notes','actions'];
  userDatabase: GetUsersDao | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              private usersService: UsersService,
              private messageService : MessageService,
              private http: HttpClient) {
  }

  addUser(ev) {
    this.userDetail = {
      fname: '',
      lname: '',
      age: undefined,
      notes: ''
    };

    this.saveEditMode = 'new';
    this.openDialog();
  }

  edit(el) {
    this.saveEditMode = 'edit';
    this.userDetail = el;
    this.openDialog();
  }

  delete(el) {
    this.usersService.deleteUser(el).subscribe(data => {
      console.log(data);
      this.loadData();
    });
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(AddUserDialog, {
      width: '350px',
      data: this.userDetail
    });

    dialogRef.afterClosed().subscribe(result => {
      if(this.saveEditMode === 'new') {
        this.usersService.saveUser(this.userDetail).subscribe(data => {
          console.log(data);
          this.loadData();
        });
      } else {
        this.usersService.updateUser(this.userDetail).subscribe(data => {
          console.log(data);
          this.loadData();
        });
      }
    });
  }

  loadData() {
    this.userDatabase = new GetUsersDao(this.http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.userDatabase!.getUsers(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.rowCount;

          return data.rows;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }

  ngAfterViewInit() {
    this.loadData();
  }
}

export interface UserApi {
  rows: User[];
  rowCount: number;
}

export interface User {
  id: number;
  title:string;
  description: string;
  priority: number;
  status: number;
}

export class GetUsersDao {
  constructor(private http: HttpClient) {}

  getUsers(sort: string, order: string, page: number): Observable<UserApi> {
    const href = location.protocol + '//' + location.host + '/api/getUsers';
    const requestUrl =
      `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<UserApi>(requestUrl);
  }
}

@Component({
  selector: 'add-user-dialog',
  templateUrl: 'add-user-dialog.html',
})
export class AddUserDialog {

  constructor(
    public dialogRef: MatDialogRef<AddUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  cancel(): void {
    this.dialogRef.close();
  }

  saveUser() : void {
    //alert('Save User')
  }


}
