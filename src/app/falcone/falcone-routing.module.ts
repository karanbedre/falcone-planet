import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindComponent } from './find/find.component';
import { FoundComponent } from './found/found.component';


const routes: Routes = [
  {
    path: '', component: FindComponent,
  },
  {
    path: 'found', component: FoundComponent,
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FalconeRoutingModule { }
