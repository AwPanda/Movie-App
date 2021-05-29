import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Sub } from '../subscription/subscription.model';
import { environment } from 'src/environments/environment.prod';
import { Movie, MovieAPI } from './movie.model';
import { map, take } from 'rxjs/operators';
import { SubscriptionService } from '../subscription/subscription.service';

interface MovieResponse {
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number
}
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  user: User;
  subs: Sub[] = []
  language: string;
  region: string;

  constructor(private http: HttpClient, private auth: AuthService, private subService: SubscriptionService) { 
    this.auth.user.subscribe(user => {
      if(user !== null) {
        this.user = user;
      }
    })
    this.language = 'en-US';
    this.region = 'GB';
  }

  searchMoviesByTitle(searchStr: string): Observable<any> {
    return this.http.get<MovieResponse>(`${environment.baseURL}search/movie?api_key=${environment.movieAPIKey}&query=${searchStr}`).pipe(
      map(resp => {
        console.log(resp)
        return new MovieAPI(resp.results.map(item => {
          return new Movie(item.id, item.backdrop_path, item.overview, item.original_title, item.title, item.release_date, item.vote_average)
        }), resp.page, resp.total_pages, resp.total_results)
    }))
  }

  getDiscoverMovies(): Observable<any> {
    return this.http.get<MovieResponse>(`${environment.baseURL}discover/movie?api_key=${environment.movieAPIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&watch_region=GB&with_watch_monetization_types=flatrate`).pipe(
      map(resp => {
        console.log(resp)
        return new MovieAPI(resp.results.map(item => {
          return new Movie(item.id, item.backdrop_path, item.overview, item.original_title, item.title, item.release_date, item.vote_average)
        }), resp.page, resp.total_pages, resp.total_results)
      })
    );
  }


  getUserDiscoverMovies(providerIds: string): Observable<any> { 
    console.log(providerIds)
    return this.http.get<MovieResponse>(`${environment.baseURL}discover/movie?api_key=${environment.movieAPIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_providers=${providerIds}&watch_region=GB&with_watch_monetization_types=flatrate`).pipe( map(resp => {
        return new MovieAPI(resp.results.map(item => {
          return new Movie(item.id, item.backdrop_path, item.overview, item.original_title, item.title, item.release_date, item.vote_average)
        }), resp.page, resp.total_pages, resp.total_results)
      })
    );
  }

  getMovie(id: string): Observable<any> {
    return this.http.get(`${environment.baseURL}movie/${id}?api_key=${environment.movieAPIKey}`);
  }

  getMovieReviews(id: string): Observable<any> {
    return this.http.get(`${environment.baseURL}movie/${id}/reviews?api_key=${environment.movieAPIKey}`);
  }

  getMovieCredits(id: string): Observable<any> {
    return this.http.get(`${environment.baseURL}movie/${id}/credits?api_key=${environment.movieAPIKey}`);
  }

  getBackdropsImages(id: string) {
    return this.http.get(`${environment.baseURL}movie/${id}/images?api_key=${environment.movieAPIKey}`);
  }

  getMovieVideos(id: string): Observable<any> {
    return this.http.get(`${environment.baseURL}movie/${id}/videos?api_key=${environment.movieAPIKey}`);
  }

  getRecomendMovies(id: string): Observable<any> {
    return this.http.get(`${environment.baseURL}movie/${id}/recommendations?api_key=${environment.movieAPIKey}`);
  }

  getPersonDetail(id: string): Observable<any> {
    return this.http.get(`${environment.baseURL}person/${id}?api_key=${environment.movieAPIKey}`);
  }

  getPersonExternalData(id: string) {
    return this.http.get(`${environment.baseURL}person/${id}/external_ids?api_key=${environment.movieAPIKey}`);
  }

  getPersonCast(id: string): Observable<any> {
    return this.http.get(`${environment.baseURL}person/${id}/movie_credits?api_key=${environment.movieAPIKey}`);
  }

  
}
