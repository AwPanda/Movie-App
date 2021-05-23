import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MovieListHomeComponent } from './movie-list-home/movie-list-home.component';

const routes: Routes = [
  {path: '',  component: MovieComponent},
  {path: ':title', component: MovieListComponent},
  {path: ':title/:id', component: MovieDetailsComponent}
  // /Movies/auth - Authenticated home page
  // /Movies - Non-Authenticated home page
];

@NgModule({
  declarations: [MovieComponent, MovieListComponent, MovieDetailsComponent, MovieSearchComponent, MovieListHomeComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class MovieModule { }
