import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Sub } from 'src/app/subscription/subscription.model';
import { Movie, MovieAPI } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.sass']
})
export class MovieListComponent implements OnInit, OnDestroy {

  movies: Movie[];
  userSub: Subscription;
  searching = false;
  tableSource: MatTableDataSource<any>;
  tableHeader = ['title', 'overview', 'release_date', 'vote_average', 'details'];


  constructor(private movieService: MovieService, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {

  let title = this.activatedRoute.snapshot.params['title'];

    this.userSub = this.authService.user.subscribe(user => {
      if(!user) {
        this.activatedRoute.params.subscribe((params: Params) => {
          console.log(params['title'])
          this.newSearch(params['title']);
        })
      } else {
     
      }
 
    })

    console.log(title)

  }

  newSearch(searchTerm: string) {
    this.searching = true;
    this.movieService.searchMoviesByTitle(searchTerm).subscribe((response: MovieAPI) => {

      if(response.total_results > 0) {
        this.tableSource = new MatTableDataSource(response.movies)
        this.searching = false;
      }
    })
  }

  getFullDetails(id: string) {
    console.log(this.router.url);
    
    this.router.navigate([this.router.url + "/", id]);
  }


  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
