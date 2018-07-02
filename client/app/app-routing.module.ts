import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserContainerComponent } from './user-container/user-container.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'users', component: UserContainerComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
