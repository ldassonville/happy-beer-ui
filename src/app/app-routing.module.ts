import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DispensersViewerComponent } from './dispensers/dispensers-viewer/dispensers-viewer.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dispensers' },
  {
    path: 'dispensers',
    component: DispensersViewerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
