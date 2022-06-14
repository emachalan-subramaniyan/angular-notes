import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './notes/index/index.component';

const routes: Routes = [
  { path: '', redirectTo: 'notes/index', pathMatch: 'full'},
  { path: 'notes/index', component: IndexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
