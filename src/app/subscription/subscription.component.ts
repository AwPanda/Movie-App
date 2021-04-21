import { Component, OnInit } from '@angular/core';
import { Sub } from './subscription.model';
import { SubscriptionService } from './subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.sass'],
})
export class SubscriptionComponent implements OnInit {


  subscriptions: Sub[] = [];

  constructor(private subService: SubscriptionService) { }

  ngOnInit(): void {

    this.subscriptions = this.subService.getSubs();
    this.subService.newSubscriptionSubject.subscribe((subs) => {
      console.log(subs);
      this.subscriptions = subs;
    })

  }

  ngOnDestry() {
    this.subService.newSubscriptionSubject.unsubscribe();
  }

}
