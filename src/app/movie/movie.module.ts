import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';

const routes: Routes = [
  {path: '', children: [  
    {path: ':title', component: MovieListComponent},
    {path: ':title/:id', component: MovieDetailsComponent}
  ], 
  component: MovieComponent},
];

@NgModule({
  declarations: [MovieComponent, MovieListComponent, MovieDetailsComponent, MovieSearchComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MovieModule { }
