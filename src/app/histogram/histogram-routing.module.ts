import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistogramComponent } from './histogram.component';

const routes: Routes = [{ path: '', component: HistogramComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistogramRoutingModule { }
