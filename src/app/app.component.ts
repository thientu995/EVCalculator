import { HttpService } from './http.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { IfStmt } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private httpService: HttpService, library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  ngOnInit() {
    forkJoin([
      this.httpService.getDataValue('aperture'),
      this.httpService.getDataValue('shutterSpeed'),
      this.httpService.getDataValue('iso'),
      this.httpService.getDataValue('stop'),
      this.httpService.getDataValue('evChart')
    ]).subscribe(results => {
      //aperture
      this.apertureValue = results[0];
      this.valueBasic.Aperture = this.apertureValue[21].value;
      this.valueFinal.Aperture = this.valueBasic.Aperture;
      //shutterSpeed
      this.shutterSpeed = results[1];
      this.valueBasic.Shutter = this.shutterSpeed[21].value;
      //iso
      this.isoValue = results[2];
      this.valueBasic.ISO = this.isoValue[12].value;
      this.valueFinal.ISO = this.valueBasic.ISO;
      //stop
      this.stopValue = results[3];
      this.valueFinal.Stop = this.stopValue[0].value;
      //evChart
      this.evChart = results[4];
      //cal
      this.onCal();
    });
  }

  ngAfterViewInit() {
  }

  Math = Math;
  title = 'Exposure Calculator';

  apertureValue = null;
  shutterSpeed = null;
  isoValue = null;
  stopValue = null;
  evChart = null;

  valueBasic = {
    FocalLength: 50,
    Aperture: 0,
    Shutter: 0,
    ISO: 0,
    Stop: 0
  };

  valueFinal = {
    Aperture: 0,
    ISO: 0,
    Stop: 0
  };

  valueResult = {
    EV: 0,
    LV: 0,
    ET: 0,

    ISO: 0,
    Stop: 0,
    ETND: 0,

    EVF: 0,
    LVF: 0,
    ETF: 0,
  }

  onCal() {
    this.valueResult.ISO = this.valueBasic.ISO;
    this.valueResult.Stop = this.valueFinal.Stop;
    this.valueResult.EV = this.calEV(this.valueBasic.Aperture, this.valueBasic.Shutter, 100);
    this.valueResult.LV = this.calEV(this.valueBasic.Aperture, this.valueBasic.Shutter, this.valueResult.ISO);

    //Result
    this.valueResult.ET = this.calET(this.valueBasic.ISO, this.valueFinal.Aperture, this.valueResult.LV);
    this.valueResult.ETF = this.calET(this.valueFinal.ISO, this.valueFinal.Aperture, this.valueResult.LV);
    this.valueResult.ETND = this.calETND(this.valueResult.ETF, this.valueResult.Stop);
  }

  calAperture(aperture: number) {
    return Math.log2(aperture * aperture)
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
    //return iso * a * a / 100 * Math.pow(2, ev);
    return (100 * Math.pow(a, 2)) / (iso * Math.pow(2, ev))
  }

  calETND(ET: number, Stop: number) {
    return Math.abs(ET * Math.pow(2, Stop));
  }

  formatSpeed(value: number) {
    var time = Math.round(1 / value);
    if (time < 0) {
      return Math.round(value) + '';
    }
    return '1/' + time;
  }

  formatNum(value: number) {
    return value.toFixed(4);
  }

  formatStyleShutter(type: string) {
    var getStatusTripod = () => {
      var value = 'F' == type ? this.valueResult.ETND : this.valueResult.ET;
      value = Number(this.formatNum(value)) - Number(this.formatNum(1 / Number(this.valueBasic.FocalLength)));
      return value > 0 ?
        '<span class="w3-text-red">Image <b>VIBRATION</b></span>'
        : null;
    }
    var getStatusISO = () => {
      var value = 'F' == type ? this.valueFinal.ISO : this.valueBasic.ISO;
      return value > 800 ?
        '<span class="w3-text-red">Image <b>NOISE</b></span>'
        : null;
    }
    var result = getStatusTripod() || getStatusISO();
    result = result || '<span class="w3-text-green">Image <b>GOOD</b></span>';
    return result;
  }

  getColorEV(index: number) {
    index = Math.abs(index + 1) * 10;
    var rgbBkg = [index, index, 0];
    var rgbColor = [255 - index, 0, 255 - index];
    return {
      'color': 'rgb(' + rgbColor.join(',') + ')',
      'background-color': 'rgb(' + rgbBkg.join(',') + ')'
    };
  }
}
