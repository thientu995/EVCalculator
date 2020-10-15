import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(library: FaIconLibrary, private titleService: Title) {
    library.addIconPacks(fas);
  }
  title = '';
  
  ngOnInit() {

  }

  ngAfterViewInit() {
  }
}
