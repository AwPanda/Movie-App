import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieAPI } from '../movie.model';
import { MovieService } from '../movie.service';
import { animate, style, state, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.sass'],
  animations: [
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void <=> *', [
        animate(500)
      ])
    ])
  ]
})
export class MovieListComponent implements OnInit {

  movies: MovieAPI = new MovieAPI([], 0, 0, 0);
  searching = false;
  tableSource: MatTableDataSource<any>;
  tableHeader = ['title', 'overview', 'release_date', 'vote_average', 'details'];
  searchTitle = "";


  constructor(private movieService: MovieService,private activatedRoute: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
   
      this.activatedRoute.params.subscribe((params: Params) => {
        this.newSearch(params['title']);
      })
    
  }

  // COULDN'T
  // newUserSearch(searchTerm: string) {
  //   this.searching = true;
  //   this.movieService.searchMoviesByTitleUser(searchTerm).subscribe((response: MovieAPI) => {
  //     console.log(response)
  //     if(response !== undefined)
  //     {
  //       this.movies = response;

  //       if(response.total_results > 0) {
  //         this.tableSource = new MatTableDataSource(response.movies)
  //       }
  //       this.searching = false;
  //     }
     
  //   })
  // }

  newSearch(searchTerm: string) {
    this.searching = true;
    this.searchTitle = searchTerm;
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


 
}
