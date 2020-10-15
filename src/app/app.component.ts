import { HttpService } from './http.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
// import { setInterval } from 'timers';


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
      this.shutterSpeed = results[1];
      this.isoValue = results[2];
      this.stopValue = results[3];
      this.evChart = results[4];
      this.setValue();
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

  showCountDown = false;
  funcCountDown = null;
  valueCountDown = '';

  valueBasic = {
    FocalLength: 50,
    Aperture: 0,
    Shutter: '0',
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
    ETND: 0,

    EVF: 0,
    LVF: 0,
    ETF: 0,
  }

  setValue(a: number = null, s: string = null, iso: number = null, stop: number = null) {
    this.valueBasic.Aperture = a || this.apertureValue[21].value;
    this.valueFinal.Aperture = this.valueBasic.Aperture;
    //shutterSpeed
    this.valueBasic.Shutter = s || this.shutterSpeed[21].text;
    //iso
    this.valueBasic.ISO = iso || this.isoValue[12].value;
    this.valueFinal.ISO = this.valueBasic.ISO;
    //stop
    this.valueFinal.Stop = stop || this.stopValue[0].value;

    //cal
    this.onCal();
  }

  onCal() {
    let sB = eval(this.valueBasic.Shutter);
    this.valueResult.EV = this.httpService.calEV(this.valueBasic.Aperture, sB, 100);
    this.valueResult.LV = this.httpService.calEV(this.valueBasic.Aperture, sB, this.valueBasic.ISO);

    //Result
    this.valueResult.ET = this.httpService.calET(this.valueBasic.ISO, this.valueBasic.Aperture, this.valueResult.LV);
    this.valueResult.ETF = this.httpService.calET(this.valueFinal.ISO, this.valueFinal.Aperture, this.valueResult.LV);
    this.valueResult.ETND = this.httpService.calETND(this.valueResult.ETF, this.valueFinal.Stop);
  }

  formatSpeed(value: number) {
    var time = Math.round(1 / value);
    if (time <= 1) {
      return Math.round(value) + '';
    }
    return '1/' + time;
  }

  formatNum(value: number) {
    return Number(value.toFixed(4));
  }

  formatStyleShutter(type: string) {
    var getStatusTripod = () => {
      var value = 'F' == type ? this.valueResult.ETND : this.valueResult.ET;
      value = this.formatNum(value) - Number(this.formatNum(1 / Number(this.valueBasic.FocalLength)));
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
    var resultStatus = [getStatusTripod(), getStatusISO()];
    var result = resultStatus.filter((x) => (x != null)).join(' and ');
    return result || '<span class="w3-text-green">Image <b>GOOD</b></span>';
  }

  getColorEV(item, index: number) {
    index = Math.abs(index + 1) * 10;
    var rgbBkg = [index, index, 0];
    var rgbColor = [255 - index, 0, 255 - index];
    return {
      'color': 'rgb(' + rgbColor.join(',') + ')',
      'background-color': item.value == Math.round(this.valueResult.LV) ? 'white' : 'rgb(' + rgbBkg.join(',') + ')'
    };
  }

  startCountdown(value: number) {
    //Function

    var msToTime = (s) => {
      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
      var hrs = (s - mins) / 60;

      return this.httpService.formatPad(hrs)
        + ':' + this.httpService.formatPad(mins)
        + ':' + this.httpService.formatPad(secs)
        + '.' + this.httpService.formatPad(ms);
    }


    var countDowntimer = (valueMs: number, initialMillis) => {
      var current = Date.now();
      if (valueMs <= 0) {
        clearInterval(this.funcCountDown);
        return [0, current];
      }
      return [valueMs - (current - initialMillis), current];
    }

    var countDownStarting = () => {
      setTimeout(() => {
        coutDown -= 1;
        if (coutDown <= 0) {
          countDownTiming();
        }
        else {
          this.valueCountDown = 'Start after ' + coutDown;
          countDownStarting();
        }
      }, 1000)
    }

    var countDownTiming = () => {
      value *= 1000;
      var initialMillis = Date.now();
      this.funcCountDown = setInterval(() => {
        let timer = countDowntimer(value, initialMillis);
        value = timer[0];
        initialMillis = timer[1];
        coutDown = this.formatNum(value / 1000);
        this.valueCountDown = ''
          + Math.floor(coutDown) + ' s'
          + '<br>'
          + msToTime(value) + ' ms'
          + '<br>'
          + '(' + this.formatNum(coutDown) + ')'
          ;
      }, 1);
    }

    // Process
    this.showCountDown = true;
    let coutDown = 2;
    this.valueCountDown = 'Start after ' + coutDown;
    countDownStarting();
  }

  closeModelCountDown() {
    this.showCountDown = false;
    clearInterval(this.funcCountDown);
  }
}
