import { animate, style, state, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sub } from './subscription.model';
import { SubscriptionService } from './subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.sass'],
  animations: [
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void <=> *', [
        animate(500)
      ])
    ]),
    trigger('slide', [
      transition('void => *', [
        style({transform: 'translateX(-20px)'}),
      ]),
      transition('void => *', [
        animate(500, style({transform: 'translateX(-20px)'})),
      ]),
    ])
  ]
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
