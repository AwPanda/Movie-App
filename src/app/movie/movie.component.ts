import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass']
})
export class MovieComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  constructor(private movie: MovieService) { }

  ngOnInit(): void {

    console.log(this.movie.subs);
    this.movie.getDiscoverMoviesSubs().subscribe(resp => {
      console.log(resp);
    })
  }

  ngOnDestroy(): void {
    console.log("test exit")
  }

}
