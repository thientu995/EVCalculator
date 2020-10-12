import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  ngOnInit() {
    this.onCal();
  }
  Math = Math;
  title = 'Exposure Calculator';
  apertureValue = [
    { value: 1, class: 'full-stop', text: 'f/1' },
    { value: 1.122, class: 'third-stop', text: 'f/1.1' },
    { value: 1.26, class: 'third-stop', text: 'f/1.2' },
    { value: 1.414, class: 'full-stop', text: 'f/1.4' },
    { value: 1.587, class: 'third-stop', text: 'f/1.6' },
    { value: 1.782, class: 'third-stop', text: 'f/1.8' },
    { value: 2, class: 'full-stop', text: 'f/2' },
    { value: 2.245, class: 'third-stop', text: 'f/2.2' },
    { value: 2.52, class: 'third-stop', text: 'f/2.5' },
    { value: 2.828, class: 'full-stop', text: 'f/2.8' },
    { value: 3.175, class: 'third-stop', text: 'f/3.2' },
    { value: 3.564, class: 'third-stop', text: 'f/3.5' },
    { value: 4, class: 'full-stop', text: 'f/4' },
    { value: 4.49, class: 'third-stop', text: 'f/4.5' },
    { value: 5.04, class: 'third-stop', text: 'f/5.0' },
    { value: 5.657, class: 'full-stop', text: 'f/5.6' },
    { value: 6.35, class: 'third-stop', text: 'f/6.3' },
    { value: 7.127, class: 'third-stop', text: 'f/7.1' },
    { value: 8, class: 'full-stop', text: 'f/8' },
    { value: 8.98, class: 'third-stop', text: 'f/9' },
    { value: 10.079, class: 'third-stop', text: 'f/10' },
    { value: 11.314, class: 'full-stop', text: 'f/11' },
    { value: 12.699, class: 'third-stop', text: 'f/13' },
    { value: 14.254, class: 'third-stop', text: 'f/14' },
    { value: 16.0, class: 'full-stop', text: 'f/16' },
    { value: 17.959, class: 'third-stop', text: 'f/18' },
    { value: 20.159, class: 'third-stop', text: 'f/20' },
    { value: 22.627, class: 'full-stop', text: 'f/22' },
    { value: 25.398, class: 'third-stop', text: 'f/25' },
    { value: 28.509, class: 'third-stop', text: 'f/28' },
    { value: 32, class: 'full-stop', text: 'f/32' },
    { value: 35.919, class: 'third-stop', text: 'f/36' },
    { value: 40.318, class: 'third-stop', text: 'f/40' },
    { value: 45.255, class: 'full-stop', text: 'f/45' },
    { value: 50.797, class: 'third-stop', text: 'f/50' },
    { value: 57.018, class: 'third-stop', text: 'f/57' },
    { value: 64, class: 'full-stop', text: 'f/64' },
    { value: 71.838, class: 'third-stop', text: 'f/72' },
    { value: 80.635, class: 'third-stop', text: 'f/80' },
    { value: 90.51, class: 'full-stop', text: 'f/90' }
  ];


  shutterSpeed = [
    { value: 0.0001221, class: 'full-stop', text: '1/8000' },
    { value: 0.0001538, class: 'third-stop', text: '1/6400' },
    { value: 0.0001938, class: 'third-stop', text: '1/5000' },
    { value: 0.0002441, class: 'full-stop', text: '1/4000' },
    { value: 0.0003076, class: 'third-stop', text: '1/3200' },
    { value: 0.0003875, class: 'third-stop', text: '1/2500' },
    { value: 0.00048828, class: 'full-stop', text: '1/2000' },
    { value: 0.0006152, class: 'third-stop', text: '1/1600' },
    { value: 0.0007751, class: 'third-stop', text: '1/1250' },
    { value: 0.0009766, class: 'full-stop', text: '1/1000' },
    { value: 0.0012304, class: 'third-stop', text: '1/800' },
    { value: 0.0015502, class: 'third-stop', text: '1/640' },
    { value: 0.0019531, class: 'full-stop', text: '1/500' },
    { value: 0.0024608, class: 'third-stop', text: '1/400' },
    { value: 0.0031004, class: 'third-stop', text: '1/320' },
    { value: 0.0039063, class: 'full-stop', text: '1/250' },
    { value: 0.0049216, class: 'third-stop', text: '1/200' },
    { value: 0.0062008, class: 'third-stop', text: '1/160' },
    { value: 0.0078125, class: 'full-stop', text: '1/125' },
    { value: 0.0098431, class: 'third-stop', text: '1/100' },
    { value: 0.0124016, class: 'third-stop', text: '1/80' },
    { value: 0.015625, class: 'full-stop', text: '1/60' },
    { value: 0.0196863, class: 'third-stop', text: '1/50' },
    { value: 0.0248031, class: 'third-stop', text: '1/40' },
    { value: 0.03125, class: 'full-stop', text: '1/30' },
    { value: 0.0393725, class: 'third-stop', text: '1/25' },
    { value: 0.0496063, class: 'third-stop', text: '1/20' },
    { value: 0.0625, class: 'full-stop', text: '1/15' },
    { value: 0.0787451, class: 'third-stop', text: '1/13' },
    { value: 0.0992126, class: 'third-stop', text: '1/10' },
    { value: 0.125, class: 'full-stop', text: '1/8' },
    { value: 0.1574901, class: 'third-stop', text: '1/6' },
    { value: 0.1984251, class: 'third-stop', text: '1/5' },
    { value: 0.25, class: 'full-stop', text: '1/4' },
    { value: 0.3149803, class: 'third-stop', text: '1/3' },
    { value: 0.3968503, class: 'third-stop', text: '1/2.5' },
    { value: 0.5, class: 'full-stop', text: '1/2' },
    { value: 0.6299605, class: 'third-stop', text: '1/1.6' },
    { value: 0.7937005, class: 'third-stop', text: '1/1.3' },
    { value: 1.0, class: 'full-stop', text: '1 second' },
    { value: 1.2599, class: 'third-stop', text: '1.3' },
    { value: 1.5874, class: 'third-stop', text: '1.6' },
    { value: 2, class: 'full-stop', text: '2' },
    { value: 2.5198, class: 'third-stop', text: '2.5' },
    { value: 3.1748, class: 'third-stop', text: '3' },
    { value: 4, class: 'full-stop', text: '4' },
    { value: 5.0397, class: 'third-stop', text: '5' },
    { value: 6.3496, class: 'third-stop', text: '6' },
    { value: 8, class: 'full-stop', text: '8' },
    { value: 10.0794, class: 'third-stop', text: '10' },
    { value: 12.6992, class: 'third-stop', text: '13' },
    { value: 16, class: 'full-stop', text: '16' },
    { value: 20.1587, class: 'third-stop', text: '20' },
    { value: 25.3984, class: 'third-stop', text: '25' },
    { value: 32, class: 'full-stop', text: '30' },
    { value: 40.3174, class: 'third-stop', text: '40' },
    { value: 50.7968, class: 'third-stop', text: '50' },
    { value: 64, class: 'full-stop', text: '60' }
  ];

  isoValue = [
    { value: '6.25/6', class: 'full-stop', text: '6' },
    { value: '7.875/8', class: 'third-stop', text: '8' },
    { value: '9.921/10', class: 'third-stop', text: '10' },
    { value: '12.5/12', class: 'full-stop', text: '12' },
    { value: '15.749/16', class: 'third-stop', text: '16' },
    { value: '19.843/20', class: 'third-stop', text: '20' },
    { value: '25/25', class: 'full-stop', text: '25' },
    { value: '31.498/32', class: 'third-stop', text: '32' },
    { value: '39.685/40', class: 'third-stop', text: '40' },
    { value: '50/50', class: 'full-stop', text: '50' },
    { value: '62.996/64', class: 'third-stop', text: '64' },
    { value: '79.37/80', class: 'third-stop', text: '80' },
    { value: '100/100', class: 'full-stop', text: '100' },
    { value: '125.992/125', class: 'third-stop', text: '125' },
    { value: '158.74/160', class: 'third-stop', text: '160' },
    { value: '200/200', class: 'full-stop', text: '200' },
    { value: '251.984/250', class: 'third-stop', text: '250' },
    { value: '317.48/320', class: 'third-stop', text: '320' },
    { value: '400/400', class: 'full-stop', text: '400' },
    { value: '503.968/500', class: 'third-stop', text: '500' },
    { value: '634.96/640', class: 'third-stop', text: '640' },
    { value: '800/800', class: 'full-stop', text: '800' },
    { value: '1007.937/1000', class: 'third-stop', text: '1000' },
    { value: '1269.921/1250', class: 'third-stop', text: '1250' },
    { value: '1600/1600', class: 'full-stop', text: '1600' },
    { value: '2015.874/2000', class: 'third-stop', text: '2000' },
    { value: '2539.841/2500', class: 'third-stop', text: '2500' },
    { value: '3200/3200', class: 'full-stop', text: '3200' },
    { value: '4031.747/4000', class: 'third-stop', text: '4000' },
    { value: '5079.683/5000', class: 'third-stop', text: '5000' },
    { value: '6400/6400', class: 'full-stop', text: '6400' },
    { value: '8063.494/8000', class: 'third-stop', text: '8000' },
    { value: '10159.366/10000', class: 'third-stop', text: '10000' },
    { value: '12800/12800', class: 'full-stop', text: '12800' },
    { value: '16126.989/16000', class: 'third-stop', text: '16000' },
    { value: '20318.7/20000', class: 'third-stop', text: '20000' },
    { value: '25600/25600', class: 'full-stop', text: '25600' },
    { value: '32254/32000', class: 'third-stop', text: '32000' },
    { value: '40637/40000', class: 'third-stop', text: '40000' },
    { value: '51200/51200', class: 'full-stop', text: '51200' },
    { value: '64508/64000', class: 'third-stop', text: '64000' },
    { value: '81275/80000', class: 'third-stop', text: '80000' },
    { value: '102400/102400', class: 'full-stop', text: '102400' }
  ];

  stopValue = [
    { value: '0', text: 'No ND: 0 stop 100%' },
    { value: '1', text: 'ND101/ND2: 1 stop 50%' },
    { value: '2', text: 'ND102/ND4: 2 stops 25%' },
    { value: '3', text: 'ND103/ND8: 3 stops 12.5%' },
    { value: '4', text: 'ND104/ND16: 4 stops 6.25%' },
    { value: '5', text: 'ND105/ND32: 5 stops 3.13%' },
    { value: '6', text: 'ND106/ND64: 6 stops 1.56%' },
    { value: '7', text: 'ND107/ND128: 7 stops 0.78%' },
    { value: '8', text: 'ND108/ND256: 8 stops 0.39%' },
    { value: '9', text: 'ND109/ND512: 9 stops 0.19%' },
    { value: '10', text: 'ND110/ND1000: 10 stops 0.1%' },
    { value: '11', text: 'ND111/ND2048: 11 stops 0.049%' },
    { value: '12', text: 'ND112/ND4096: 12 stops 0.024%' },
    { value: '13', text: 'ND113/ND8192: 13 stops 0.012%' },
  ]

  evChart = [
    { value: '-6', color: '', icon: 'star-and-crescent', lightSource: 'Starlight to dim ambient light', text: 'Night, away from city lights, subject under starlight only.' },
    { value: '-5', color: '', icon: 'star-and-crescent', lightSource: 'Starlight to dim ambient light', text: 'Night, away from city lights, subject under crescent moon.' },
    { value: '-4', color: '', icon: 'star-and-crescent', lightSource: 'Starlight to dim ambient light', text: 'Night, away from city lights, subject under half moon. Meteors (during showers, with time exposure).' },
    { value: '-3', color: '', icon: 'star-and-crescent', lightSource: 'Starlight to dim ambient light', text: 'Night, away from city lights, subject under full moon.' },
    { value: '-2', color: '', icon: 'star-and-crescent', lightSource: 'Starlight to dim ambient light', text: 'Night, away from city lights, snowscape under full moon.' },
    { value: '-1', color: '', icon: 'star-and-crescent', lightSource: 'Starlight to dim ambient light', text: 'Subjects lit by dim ambient artificial light.' },
    { value: '0', color: '', icon: 'star-and-crescent', lightSource: 'Starlight to dim ambient light', text: 'Subjects lit by dim ambient artificial light.' },
    { value: '1', color: '', icon: 'moon', lightSource: 'Moon eclipse to night home interior', text: 'Distant view of lighted skyline.' },
    { value: '2', color: '', icon: 'moon', lightSource: 'Moon eclipse to night home interior', text: 'Lightning (with time exposure). Total eclipse of moon.' },
    { value: '3', color: '', icon: 'moon', lightSource: 'Moon eclipse to night home interior', text: 'Fireworks (with time exposure).' },
    { value: '4', color: '', icon: 'moon', lightSource: 'Moon eclipse to night home interior', text: 'Candle lit close-ups. Christmas lights, floodlit buildings, fountains, and monuments. Subjects under bright street lamps.' },
    { value: '5', color: '', icon: 'moon', lightSource: 'Moon eclipse to night home interior', text: 'Night home interiors, average light. School or church auditoriums. Subjects lit by campfires or bonfires.' },
    { value: '6', color: '', icon: 'lightbulb', lightSource: 'Neon lights to landscape after sunset', text: 'Brightly lit home interiors at night. Fairs, amusement parks.' },
    { value: '7', color: '', icon: 'lightbulb', lightSource: 'Neon lights to landscape after sunset', text: 'Bottom of rainforest canopy. Brightly lighted nighttime streets. Indoor sports. Stage shows, circuses.' },
    { value: '8', color: '', icon: 'lightbulb', lightSource: 'Neon lights to landscape after sunset', text: 'Las Vegas or Times Square at night. Store windows. Campfires, bonfires, burning buildings. Ice shows, football, baseball etc. at night. Interiors with bright florescent lights.' },
    { value: '9', color: '', icon: 'lightbulb', lightSource: 'Neon lights to landscape after sunset', text: 'Landscapes, city skylines 10 minutes after sunset. Neon lights, spotlighted subjects.' },
    { value: '10', color: '', icon: 'lightbulb', lightSource: 'Neon lights to landscape after sunset', text: 'Landscapes and skylines immediately after sunset. Crescent moon (long lens).' },
    { value: '11', color: '', icon: 'sun', lightSource: 'Bright light to weak sun', text: 'Sunsets. Subjects in deep shade.' },
    { value: '12', color: '', icon: 'sun', lightSource: 'Bright light to weak sun', text: 'Half moon (long lens). Subject in open shade or heavy overcast.' },
    { value: '13', color: '', icon: 'sun', lightSource: 'Bright light to weak sun', text: 'Gibbous moon (long lens). Subjects in cloudy-bright light (no shadows).' },
    { value: '14', color: '', icon: 'sun', lightSource: 'Bright light to weak sun', text: 'Full moon (long lens). Subjects in weak, hazy sun.' },
    { value: '15', color: '', icon: 'sun', lightSource: 'Bright light to weak sun', text: 'Subjects in bright or hazy sun (Sunny f/16 rule).' },
    { value: '16', color: '', icon: 'sun', lightSource: 'Bright light to weak sun', text: 'Subjects in bright daylight on sand or snow.' },
    { value: '17', color: '', icon: 'sun', lightSource: 'Bright daylight to direct sunlight', text: 'Rarely encountered in nature. Some man made lighting.' },
    { value: '18', color: '', icon: 'sun', lightSource: 'Bright daylight to direct sunlight', text: 'Rarely encountered in nature. Some man made lighting.' },
    { value: '19', color: '', icon: 'sun', lightSource: 'Bright daylight to direct sunlight', text: 'Rarely encountered in nature. Some man made lighting.' },
    { value: '20', color: '', icon: 'sun', lightSource: 'Bright daylight to direct sunlight', text: 'Rarely encountered in nature. Some man made lighting.' },
    { value: '21', color: '', icon: 'sun', lightSource: 'Bright daylight to direct sunlight', text: 'Rarely encountered in nature. Some man made lighting.' },
    { value: '22', color: '', icon: 'sun', lightSource: 'Bright daylight to direct sunlight', text: 'Extremely bright. Rarely encountered in nature.' },
    { value: '23', color: '', icon: 'sun', lightSource: 'Bright daylight to direct sunlight', text: 'Extremely bright. Rarely encountered in nature.' },
  ]

  valueBasic = {
    FocalLength: 50,
    Aperture: this.apertureValue[21].text,
    Shutter: this.shutterSpeed[21].text,
    ISO: this.isoValue[12].value,
    Stop: this.stopValue[0].value
  };
  valueFinal = {
    Aperture: this.apertureValue[21].text,
    ISO: this.isoValue[12].value,
    Stop: this.stopValue[0].value
  };

  valueResult = {
    EV: 0,
    LV: 0,
    ET: 0,
    ISO: 0,
    Stop: 0,
    ETND: 0,
  }

  onCal() {
    this.valueResult.ISO = Number(this.valueFinal.ISO.split("/")[1]);
    this.valueResult.Stop = Number(this.valueFinal.Stop);
    this.valueResult.EV = this.calEV(Number(this.valueBasic.Aperture.split("/")[1]), eval(this.valueBasic.Shutter), 100);
    this.valueResult.LV = this.calEV(Number(this.valueBasic.Aperture.split("/")[1]), eval(this.valueBasic.Shutter), this.valueResult.ISO);

    this.valueResult.ET = this.calET(Number(this.valueBasic.ISO.split("/")[1]), Number(this.valueFinal.Aperture.split("/")[1]), this.valueResult.LV);
    var ETFinal = this.calET(this.valueResult.ISO, Number(this.valueFinal.Aperture.split("/")[1]), this.valueResult.LV);
    this.valueResult.ETND = this.calETND(ETFinal, this.valueResult.Stop);
  }

  /**
 * https://photo.stackexchange.com/questions/32359/why-does-ev-increase-as-iso-increases
 * the  log₂(100/S) is wrong on that link!
 *
 * EV = log₂(N²) + log₂(1/t) - log₂(S/100)
 * EV = aperture + shutter - ISO
 *
 *
 * https://photo.stackexchange.com/questions/73304/when-to-use-the-lv-formula
 * Another way to look at it
 * EV = log2(f^2/T)          Exposure Value
 * LV = EV + log2(ISO/100)   Light Value (= EV assumes ISO 100)
 */
  /**
 * https://photo.stackexchange.com/questions/32359/why-does-ev-increase-as-iso-increases
 * the  log₂(100/S) is wrong on that link!
 * The correct formula appears in Wikipedia
 * https://en.wikipedia.org/wiki/Exposure_value
 *
 * EV = log₂(N²) + log₂(1/t) - log₂(S/100)
 * EV = aperture + shutter - ISO
 *
 * t = S*N²/100*2^EV
 *
 * * where:
 * - N is the relative aperture (f-number)
 * - t is the exposure time ("shutter speed") in seconds[2]
 * - 100 is the default ISO
 * - S is the new ISO
 */
  /**
     * Given an original speed and the Stop value of the attached NF filter, it calculates the final
     * exposure time.
     * http://www.vassilistangoulis.com/gr/?p=4958
     *
     * Tnd = T0 * 2^ND
     *
     * where:
     * - ND is the Stop value of your ND filter
     * - T0 is the Base shutter speed (without filter attached) in seconds
     * - Tnd is the final exposure time
     */

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
    if (time < 0.0000001) {
      return Math.round(value) + '';
    }
    return '1/' + time;
  }

  formatNum(value: number) {
    return value.toFixed(4);
  }

  formatStyleShutter(value: number) {
    value = Number(this.formatNum(value)) - Number(this.formatNum(1 / Number(this.valueBasic.FocalLength)));
    if (value > 0) {
      return 'You should use a <b>TRIPOD</b>';
    }
    else {
      return '';
    }
  }

  getColorEV(index: number) {
    index = Math.abs(index + 1);
    var rgbBkg = [10 * index, 10 * index, 0];
    var rgbColor = [255 - (index * 10), 0, 0];
    return {
      'color': 'rgb(' + rgbColor.join(',') + ')',
      'background-color': 'rgb(' + rgbBkg.join(',') + ')'
    };
  }
}
