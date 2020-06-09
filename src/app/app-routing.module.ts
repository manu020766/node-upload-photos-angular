import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoFormComponent } from './components/photo-form/photo-form.component';
import { PhotoPreviewComponent } from './components/photo-preview/photo-preview.component';
import { PhotoForm2Component } from './components/photo-form2/photo-form2.component';

const routes: Routes = [
  { path: 'photos', component: PhotoListComponent },
  { path: 'photos/new', component: PhotoFormComponent },
  { path: 'photos/:id/editar', component: PhotoFormComponent },
  { path: 'photos/experimento', component: PhotoForm2Component },
  { path: 'photos/:id', component: PhotoPreviewComponent },
  { path: '', redirectTo: '/photos', pathMatch: 'full' },
  { path: '**', redirectTo: '/photos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
