import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscription/subscription.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass']
})
export class MovieComponent implements OnInit {

  constructor(private subService: SubscriptionService) { }

  ngOnInit(): void {

  }

}
