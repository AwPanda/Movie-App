import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.sass']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private movieService: MovieService, private router: ActivatedRoute) { 
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }
  movie: any;
  casts: any = [];
  backdrops: any = [];
  recomendMovies: any = [];
  responsiveOptions: any;
  
  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      const id = params['id'];
      console.log(id);
      this.getSingleMoviesDetails(id);
      this.getCast(id);
      this.getBackropsImages(id);
      this.getRecomendMovie(id);
    });
  }

  getSingleMoviesDetails(id: string){
    this.movieService.getMovie(id).subscribe((res: any) => {
      this.movie = res;
    });
  }

  getCast(id: string) {
    this.movieService.getMovieCredits(id).subscribe((res: any) => {
      this.casts = res.cast;
    });
  }

  getBackropsImages(id: string) {
    this.movieService.getBackdropsImages(id).subscribe((res: any) => {
      this.backdrops = res.backdrops;
    });
  }

  getRecomendMovie(id: string) {
    this.movieService.getRecomendMovies(id).subscribe((res: any) => {
      this.recomendMovies = res.results;
    });
  }
}
