import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionComponent } from './subscription.component';

import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SubscriptionItemComponent } from './subscription-item/subscription-item.component';

const routes: Routes = [
  {path: '', pathMatch: "full", component: SubscriptionComponent},
];

@NgModule({
  declarations: [SubscriptionComponent, SubscriptionItemComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    MatCardModule 
  ]
})
export class SubscriptionModule { }
