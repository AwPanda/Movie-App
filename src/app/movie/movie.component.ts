import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sub } from '../subscription/subscription.model';
import { SubscriptionService } from '../subscription/subscription.service';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass']
})
export class MovieComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  constructor(private movie: MovieService, private sub: SubscriptionService) { }

  ngOnInit(): void {
    // console.log("test");
    // this.sub.newSubscriptionSubject.subscribe(resp => {
    //   console.log(resp);
    //   this.movie.getDiscoverMoviesSubs(resp).subscribe(resp => {
    //     console.log(resp);
    //     this.movies = resp
    //   })
    // })
    console.log("test");
 
  }

  ngOnDestroy(): void {
    console.log("test exit")
  }

}
