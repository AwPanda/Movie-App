import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sub } from './subscription.model';
import { SubscriptionService } from './subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.sass'],
})
export class SubscriptionComponent implements OnInit, OnDestroy {


  userSubs: Sub[] = [];
  sub: Subscription;

  constructor(private subService: SubscriptionService) { }

  ngOnInit(): void {
    this.sub = this.subService.newSubscriptionSubject.subscribe((subs) => {
      this.userSubs = subs.slice();
    })
  
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
