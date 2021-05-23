import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Sub } from '../subscription/subscription.model';
import { SubscriptionService } from '../subscription/subscription.service';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass']
})
export class MovieComponent implements OnInit {

  movies: Movie[] = [];
  user: User;
  constructor(private movie: MovieService, private sub: SubscriptionService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(resp => {
      console.log(resp);
      this.user = resp;
    })
  }

  
}
