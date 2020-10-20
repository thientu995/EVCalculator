import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit {
  title = 'Histogram';
  @ViewChild('canvasHistogram')
  canvasHistogram: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasHistogramColor')
  canvasHistogramColor: ElementRef<HTMLCanvasElement>;

  constructor(private sanitizer: DomSanitizer, private titleService: Title, private app: AppComponent) {
    app.title = this.title;
    titleService.setTitle(this.title);
  }

  ngOnInit(): void {
  }

  dataFileUpload = null;

  handleFileInput(event) {
    let files = event.target.files;
    if (files && files[0])
      this.getDataFile(files[0]);
  }

  handleProcessImg(event) {
    let inImg = this.getDataImg(event.target);
    this.getCanvas(inImg, this.canvasHistogram.nativeElement, false);
    this.getCanvas(inImg, this.canvasHistogramColor.nativeElement, true);
  }

  handleAllowDrop(ev) {
    ev.preventDefault();
  }

  handleDrop(ev) {
    ev.preventDefault();
    let files = ev.dataTransfer.files;
    if (files && files[0])
      this.getDataFile(files[0]);
  }

  handleClick(ev) {
    let element:HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
    element.click();
  }

  private getDataFile(file) {
    let URL = window.URL;
    this.dataFileUpload = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
  }

  private getCanvas(inImg: ImageData, canvas: HTMLCanvasElement, isValueHistogram: boolean) {
    // const width = inImg.width;
    // const height = inImg.height;
    const src = new Uint32Array(inImg.data.buffer);

    let histBrightness = (new Array(256)).fill(0);
    let histR = (new Array(256)).fill(0);
    let histG = (new Array(256)).fill(0);
    let histB = (new Array(256)).fill(0);
    for (let i = 0; i < src.length; i++) {
      let r = src[i] & 0xFF;
      let g = (src[i] >> 8) & 0xFF;
      let b = (src[i] >> 16) & 0xFF;
      histBrightness[r]++;
      histBrightness[g]++;
      histBrightness[b]++;
      histR[r]++;
      histG[g]++;
      histB[b]++;
    }

    let maxBrightness = 0;
    if (isValueHistogram) {
      for (let i = 1; i < 256; i++) {
        if (maxBrightness < histBrightness[i]) {
          maxBrightness = histBrightness[i]
        }
      }
    } else {
      for (let i = 0; i < 256; i++) {
        if (maxBrightness < histR[i]) {
          maxBrightness = histR[i]
        } else if (maxBrightness < histG[i]) {
          maxBrightness = histG[i]
        } else if (maxBrightness < histB[i]) {
          maxBrightness = histB[i]
        }
      }
    }

    // const canvas = this.canvasHistogram.nativeElement;
    const ctx = canvas.getContext('2d');
    let guideHeight = 8;
    let startY = (canvas.height - guideHeight);
    let dx = canvas.width / 256;
    let dy = startY / maxBrightness;
    ctx.lineWidth = dx;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 256; i++) {
      let x = i * dx;
      if (isValueHistogram) {
        // Value
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, startY - histBrightness[i] * dy);
        ctx.closePath();
        ctx.stroke();
      } else {
        // Red
        ctx.strokeStyle = "rgba(220,0,0,0.5)";
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, startY - histR[i] * dy);
        ctx.closePath();
        ctx.stroke();
        // Green
        ctx.strokeStyle = "rgba(0,210,0,0.5)";
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, startY - histG[i] * dy);
        ctx.closePath();
        ctx.stroke();
        // Blue
        ctx.strokeStyle = "rgba(0,0,255,0.5)";
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, startY - histB[i] * dy);
        ctx.closePath();
        ctx.stroke();
      }
      // Guide
      ctx.strokeStyle = 'rgb(' + i + ', ' + i + ', ' + i + ')';
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, canvas.height);
      ctx.closePath();
      ctx.stroke();
    }
  }

  private getDataImg(target) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = document.getElementsByTagName('img')[0];
    canvas.width = target.width;
    canvas.height = target.height;
    context.drawImage(img, 0, 0);
    return context.getImageData(0, 0, target.width, target.height);
  }
}
