import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HistogramRoutingModule } from './histogram-routing.module';
import { HistogramComponent } from './histogram.component';


@NgModule({
  declarations: [HistogramComponent],
  imports: [
    CommonModule,
    FormsModule,
    HistogramRoutingModule
  ]
})
export class HistogramModule { }
