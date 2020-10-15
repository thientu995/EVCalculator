import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ExposureCalculatorRoutingModule } from './exposure-calculator-routing.module';
import { ExposureCalculatorComponent } from './exposure-calculator.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [ExposureCalculatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ExposureCalculatorRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class ExposureCalculatorModule {

  calAperture(aperture: number) {
    return Math.log2(aperture * aperture);
  }

  calShutter(shutter: number) {
    return Math.log2(1 / shutter);
  }

  calISO(iso: number) {
    return Math.log2(iso / 100);
  }

  calEV(a: number, s: number, iso: number) {
    return this.calAperture(a) + this.calShutter(s) - this.calISO(iso);
  }

  calET(iso: number, a: number, ev: number) {
    return (iso * Math.pow(a, 2)) / (100 * Math.pow(2, ev))
  }

  calETND(ET: number, Stop: number) {
    return Math.abs(ET * Math.pow(2, Stop));
  }

  formatPad(n) {
    var z = 2;
    return ('00' + n).slice(-z);
  }

}
