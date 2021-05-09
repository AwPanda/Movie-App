import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Sub } from '../subscription/subscription.model';
import { environment } from 'src/environments/environment.prod';
import { Movie } from './movie.model';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  user: User;
  subs: Sub[] = []

  constructor(private http: HttpClient, private auth: AuthService) { 
    this.auth.user.subscribe(resp => {
      if(resp !== null) {
        this.user = resp;
      }
    })

  }


  getDiscoverMovies(): Observable<any> {
    return this.http.get<Movie>(`${environment.baseURL}discover/movie?api_key=${environment.movieAPIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&watch_region=GB&with_watch_monetization_types=flatrate`);
  }

  getDiscoverMoviesSubs(subs: Sub[]): Observable<any> {
    console.log(subs);

    return this.http.get<Movie>(`${environment.baseURL}discover/movie?api_key=${environment.movieAPIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_providers=${"providerIds"}&watch_region=GB&with_watch_monetization_types=flatrate`);
  }

  
}
