import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )},
  {path: 'movies', loadChildren: () => import('./movie/movie.module').then( m => m.MovieModule )},
  {path: 'subscriptions', loadChildren: () => import('./subscription/subscription.module').then( m => m.SubscriptionModule ), canActivate: [AuthGuardService]},
  {path: '', pathMatch: "full", redirectTo: "/movies"},
  // Putting 404 error in here as I think it makes sense since it's used across the application. Putting it in individual modules I would have to duplicate the below code for each module
  {path: '404', component: Error404Component},
  {path: '**', redirectTo: '/404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
