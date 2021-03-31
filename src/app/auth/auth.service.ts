import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { User } from './user.model';

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTime: any;

  //AIzaSyBcQAaIcyanab6MT9ghRBPWD9ShuUKA3Kk

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(errorResponse => {
        let errorMessage = "An unknown error occurred";

        if(!errorResponse.error || !errorResponse.error.error) {
          return throwError(errorMessage);
        }
        
        switch(errorResponse.error.error.message){
          case 'EMAIL_EXISTS':
            errorMessage = "Sorry this email is already in use";
            break;
          case 'INVALID_EMAIL':
            errorMessage = "Provided email address is invalid";
            break;
        }

        return throwError(errorMessage);
      }),
      tap(response => {this.handleAuth(response)})
    )
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(errorResponse => {
        let errorMessage = "An unknown error occurred";

        if(!errorResponse.error || !errorResponse.error.error) {
          return throwError(errorMessage);
        }
        
        switch(errorResponse.error.error.message){
          case 'EMAIL_NOT_FOUND':
          case 'INVALID_PASSWORD':
            errorMessage = "Invalid login credentials";
            break;
          case 'USER_DISABLED':
            errorMessage = "This account has been disabled";
            break;
        }

        return throwError(errorMessage);
      }),
      tap(response => {this.handleAuth(response)})
    )
  }

  handleAuth(response: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
    const user = new User(response.email, response.localId, response.idToken, expirationDate);

    // Ommit the new user
    this.user.next(user);
    this.router.navigate(['/deal']);

    // Store user in localStorage
    localStorage.setItem('userData', JSON.stringify(user));

    this.autoLogout(+response.expiresIn * 1000);
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string,
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData){
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if(loadedUser.Token){
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      this.user.next(loadedUser);
    }
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTime = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/deal']);
    localStorage.removeItem('userData');
  }
}
