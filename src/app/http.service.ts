import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface IApertureValue {
  value: number;
  class: string;
  text: string;
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getDataValue(type: string) {
    return this.http.request(
      'GET', '/assets/value/' + type + 'Value.json',
      {
        responseType: "json",
        params: null
      }
    );
  }

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
