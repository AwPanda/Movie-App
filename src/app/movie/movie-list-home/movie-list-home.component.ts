import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Sub } from 'src/app/subscription/subscription.model';
import { SubscriptionService } from 'src/app/subscription/subscription.service';
import { Movie, MovieAPI } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list-home',
  templateUrl: './movie-list-home.component.html',
  styleUrls: ['./movie-list-home.component.sass']
})
export class MovieListHomeComponent implements OnInit {

  movies: MovieAPI = new MovieAPI([], 0, 0, 0);
  searching = false;
  tableSource: MatTableDataSource<any>;
  userSub: Subscription;
  tableHeader = ['title', 'overview', 'release_date', 'vote_average', 'details'];
  userCurrentSubs: Sub[] = [];
  constructor(private movieService: MovieService, private authService: AuthService, private subService: SubscriptionService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.movies.movies)
    this.userSub = this.authService.user.subscribe(user => {
      if(user === null) {
        this.getMovies()
      } else {
        this.getUserMovies();
      }
    })
  
  }

  
  getFullDetails(id: string) {
    console.log(this.router.url);
    
    this.router.navigate(['/movies/details/', id]);
  }

  getMovies() {
    this.searching = true;
    console.log(this.userCurrentSubs);
    this.movieService.getDiscoverMovies().subscribe((response: MovieAPI) => {
      console.log(response.movies);
      this.movies = response;

      if(response.total_results > 0) {
        this.tableSource = new MatTableDataSource(response.movies)
      }
      this.searching = false;

    })
  }

  getUserMovies() {
    this.searching = true;
    this.subService.getUserSubs().subscribe((resp: any) => {
      if(resp === null)
      {
        this.getMovies();
      }
      else{
        let providerIds = this.getAllSubscribedSubscriptions(resp);
        console.log(providerIds)
        this.movieService.getUserDiscoverMovies(providerIds).subscribe((response: MovieAPI) => {
          console.log(response.movies);
          this.movies = response;
          if(response.total_results > 0) {
            this.tableSource = new MatTableDataSource(response.movies)
          }
          this.searching = false;
          
        })
      }
    })
  }

  getAllSubscribedSubscriptions(Subs: Sub[]): string {

    if(Subs === null)
      return "";

    // Convert subscription(where subscribed == true) array to pipe seperated string
    const subscribedSubs = Subs.filter(e => e.subscribed).map(e => e.subId.toString()).join("|");
    return subscribedSubs;
  
  }
}
