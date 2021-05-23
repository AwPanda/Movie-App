import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TrimStringPipe } from '../trim-string.pipe';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    TrimStringPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoadingSpinnerComponent,
    TrimStringPipe,
    CommonModule,
  ]
})
export class SharedModule { }
