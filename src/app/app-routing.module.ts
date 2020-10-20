import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./exposure-calculator/exposure-calculator.module').then(m => m.ExposureCalculatorModule)
  },
  {
    path: 'histogram',
    loadChildren: () => import('./histogram/histogram.module').then(m => m.HistogramModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
