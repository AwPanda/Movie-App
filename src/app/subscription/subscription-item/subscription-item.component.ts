import { Component, Input, OnInit } from '@angular/core';
import { Sub } from '../subscription.model';
import { SubscriptionService } from '../subscription.service';

@Component({
  selector: 'app-subscription-item',
  templateUrl: './subscription-item.component.html',
  styleUrls: ['./subscription-item.component.sass']
})
export class SubscriptionItemComponent implements OnInit {

  @Input() sub!: Sub;
  constructor(private subService: SubscriptionService) { }

  ngOnInit(): void {

    console.log(this.sub)
  }

  subChange(event: any) {
    this.sub.subscribed = event.target.checked;

    this.subService.onStateChange(this.sub);
  }

}
