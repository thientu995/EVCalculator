import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExposureCalculatorComponent } from './exposure-calculator.component';

const routes: Routes = [{ path: '', component: ExposureCalculatorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExposureCalculatorRoutingModule { }
