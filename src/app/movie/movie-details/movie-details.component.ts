import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.sass']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private movieService: MovieService, private router: ActivatedRoute, private _location: Location) { }
  movie: any;
  movieImg: string = "https://image.tmdb.org/t/p/w500/";
  watchProviders: any = [];
  
  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      const id = params['id'];
      console.log(id);
      this.getSingleMoviesDetails(id);
      this.getWatchProviders(id);
    });
  }

  getSingleMoviesDetails(id: string){
    this.movieService.getMovieFullDetails(id).subscribe((res: any) => {
      console.log(res);
      this.movie = res;
      this.movieImg = this.movieImg + res.backdrop_path;
    });
  }

  getWatchProviders(id: string) {
    this.movieService.getMovieWatchProviders(id).subscribe((res: any) => {
      console.log(res.results.GB.flatrate);
      if(res.results.GB.flatrate !== undefined)
      {
        this.watchProviders = res.results.GB.flatrate;
      }
    })
  }

  backClicked() {
    this._location.back();
  }
}
