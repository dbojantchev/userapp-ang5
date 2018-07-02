import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule

} from '@angular/material';

@NgModule({

  imports: [

    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule

  ],

  exports: [

    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule

  ]
})

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
