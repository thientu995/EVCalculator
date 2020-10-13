# EVCal



## ND Filter

Given an original speed and the Stop value of the attached NF filter, it calculates final
exposure time.
http://www.vassilistangoulis.com/gr/?p=4958
Tnd = T0 * 2^ND
where:
- ND is the Stop value of your ND filter
- T0 is the Base shutter speed (without filter attached) in seconds
- Tnd is the final exposure time

## EV Cal

 https://photo.stackexchange.com/questions/32359/why-does-ev-increase-as-iso-increases
 the  log2(100/S) is wrong on that link!
 The correct formula appears in Wikipedia
 https://en.wikipedia.org/wiki/Exposure_value

 EV = log2(N²) + log2(1/t) - log2(S/100)
 EV = aperture + shutter - ISO

 t = S*N²/100*2^EV

 * where:
 - N is the relative aperture (f-number)
 - t is the exposure time ("shutter speed") in seconds[2]
 - 100 is the default ISO
 - S is the new ISO

## LV Cal

 https://photo.stackexchange.com/questions/32359/why-does-ev-increase-as-iso-increases
 the  log2(100/S) is wrong on that link!
  EV = log2(N²) + log2(1/t) - log2(S/100)
 EV = aperture + shutter - ISO
   https://photo.stackexchange.com/questions/73304/when-to-use-the-lv-formula
 Another way to look at it
 EV = log2(f^2/T)          Exposure Value
 LV = EV + log2(ISO/100)   Light Value (= EV assumes ISO 100)
