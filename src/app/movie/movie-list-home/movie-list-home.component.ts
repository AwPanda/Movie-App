import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Sub } from 'src/app/subscription/subscription.model';
import { SubscriptionService } from 'src/app/subscription/subscription.service';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list-home',
  templateUrl: './movie-list-home.component.html',
  styleUrls: ['./movie-list-home.component.sass']
})
export class MovieListHomeComponent implements OnInit, OnDestroy {

  movies: Movie[];
  searching = false;
  tableSource: MatTableDataSource<any>;
  userSub: Subscription;
  tableHeader = ['title', 'overview', 'release_date', 'vote_average', 'details'];
  userCurrentSubs: Sub[] = [];
  constructor(private movieService: MovieService, private authService: AuthService, private subService: SubscriptionService, private router: Router) { }

  ngOnInit(): void {
    this.userSub = this.subService.newSubscriptionSubject.subscribe(resp => {
      this.userCurrentSubs = resp;
      this.getUserMovies();
    })
  }

  
  getFullDetails(id: string) {
    console.log(this.router.url);
    
    this.router.navigate(['/movies/search/', id]);
  }

  getUserMovies() {
    this.searching = true;
    console.log(this.userCurrentSubs);
    this.movieService.getUserDiscoverMovies(this.userCurrentSubs).subscribe(response => {
    
      this.tableSource = new MatTableDataSource(response.results)
      this.searching = false;
     
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
