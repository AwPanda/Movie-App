import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MovieAPI } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.sass']
})
export class MovieListComponent implements OnInit, OnDestroy {

  movies: MovieAPI = new MovieAPI([], 0, 0, 0);
  userSub: Subscription;
  searching = false;
  tableSource: MatTableDataSource<any>;
  tableHeader = ['title', 'overview', 'release_date', 'vote_average', 'details'];
  searchTitle = "";


  constructor(private movieService: MovieService, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.searchTitle = params['title'];
        if(user !== null) {
          this.newUserSearch(params['title']);
        } else {
          this.newSearch(params['title']);
        }
      })
    })
  }

  newUserSearch(searchTerm: string) {
    this.searching = true;
    this.movieService.searchMoviesByTitle(searchTerm).subscribe((response: MovieAPI) => {
      console.log(response.movies)
      this.movies = response;

      if(response.total_results > 0) {
        this.tableSource = new MatTableDataSource(response.movies)
      }
      this.searching = false;
    })
  }

  newSearch(searchTerm: string) {
    this.searching = true;
    this.movieService.searchMoviesByTitle(searchTerm).subscribe((response: MovieAPI) => {
      console.log(response.movies)
      this.movies = response;

      if(response.total_results > 0) {
        this.tableSource = new MatTableDataSource(response.movies)
      }
      this.searching = false;
    })
  }

  getFullDetails(id: string) {
    this.router.navigate([this.router.url + "/", id]);
  }


  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
