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
  
  subs: Sub[] = [
    new Sub(9, "Amazon Prime Video", false),
    new Sub(39, "Now TV", false),
    new Sub(29, "Sky Go", false),
    new Sub(337, "Disney Plus", false),
    new Sub(1, "Netflix", false),
  ]

  newSubscriptionSubject = new BehaviorSubject<Sub[]>(this.subs);
  user: User;

  // Setup static subscriptions - The false will change depending on the logged in users current setup

  constructor(private http: HttpClient, private auth: AuthService) { 
    this.auth.user.subscribe(user => {
      this.user = user;
  
    })

    this.getUserSubs()?.subscribe(resp => {
      if(resp) {
        this.newSubscriptionSubject.next(resp);
      }
    })
  }

  onStateChange(sub: Sub){
    const index = this.subs.map(e => e.subId).indexOf(sub.subId);
    this.subs[index].subscribed = sub.subscribed;

    this.newSubscriptionSubject.next(this.subs.slice());
    this.http.put(`https://movie-app-8bb1d-default-rtdb.europe-west1.firebasedatabase.app/subscriptions/${this.user.id}.json`, this.subs.slice()).subscribe();
  } 

  getUserSubs() {
    if(!this.user) {
      return;
    } 
    return this.http.get<Sub[]>(`https://movie-app-8bb1d-default-rtdb.europe-west1.firebasedatabase.app/subscriptions/${this.user.id}.json`).pipe(
      tap(response => {
        if(response) {
          this.handleUserSubs(response);
        }
      })
    );
  }

  handleUserSubs(subs: Sub[]) {

    for(var sub of subs) {
      const index = this.subs.map(e => e.subId).indexOf(sub.subId);
      this.subs[index] = sub;
    }
    this.newSubscriptionSubject.next(this.subs.slice());
  }

  getSubs() {
    return this.subs.slice();
  }
}
