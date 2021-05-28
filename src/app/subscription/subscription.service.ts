import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Sub } from './subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  
  initialSubs: Sub[] = [
    new Sub(10, "Amazon Prime Video", false, './assets/amazon.png'),
    new Sub(39, "Now TV", false, './assets/now.jpg'),
    new Sub(29, "Sky Go", false, './assets/sky-go.png'),
    new Sub(337, "Disney Plus", false, './assets/disney-plus.jpg'),
    new Sub(8, "Netflix", false, './assets/netflix.jpg'),
  ]

  userSubs: Sub[] = this.initialSubs.slice();
  newSubscriptionSubject = new BehaviorSubject<Sub[]>(this.initialSubs.slice());
  user: User;

  // Setup static subscriptions - The false will change depending on the logged in users current setup

  constructor(private http: HttpClient, private auth: AuthService) { 
    
    this.auth.user.subscribe(user => {
      if(user === null) {
        this.userSubs = this.initialSubs.slice()
        this.newSubscriptionSubject.next(this.userSubs.slice());
      } else {
        this.user = user;
        this.getSubs();
      }
    })
  }

  onStateChange(sub: Sub){
    const index = this.userSubs.map(e => e.subId).indexOf(sub.subId);
    this.userSubs[index].subscribed = sub.subscribed;
 
    this.newSubscriptionSubject.next(this.userSubs.slice());
    this.http.put(`https://movie-app-8bb1d-default-rtdb.europe-west1.firebasedatabase.app/subscriptions/${this.user.id}.json`, this.userSubs.filter(e => e.subscribed).slice(), 
    {
      params: { 
        'auth': this.user.Token
      }
    }
    ).subscribe();
  } 

  getUserSubs() {
    return this.http.get<Sub[]>(`https://movie-app-8bb1d-default-rtdb.europe-west1.firebasedatabase.app/subscriptions/${this.user.id}.json`, 
    {
      params: {
        'auth': this.user.Token,
      }
    })
  }



  getSubs() {
    console.log("test")

    this.getUserSubs().subscribe(resp => {
      console.log("test")
      if(resp !== null) {
        for(var sub of resp) {
          const index = this.userSubs.map(e => e.subId).indexOf(sub.subId);
          this.userSubs[index] = sub;
        }
        console.log(this.userSubs.slice());
        this.newSubscriptionSubject.next(this.userSubs.slice());
        console.log("test")
      } else {
        this.newSubscriptionSubject.next(this.initialSubs.slice());
      }
    })
  }
}
