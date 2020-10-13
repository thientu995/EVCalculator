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
}
