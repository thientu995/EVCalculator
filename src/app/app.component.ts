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
  hiddenMenu = false;
  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  toggleMenu() {
    this.hiddenMenu = !this.hiddenMenu;
  }

  clickMenu(ev) {
    console.log(ev.target);
    this.hiddenMenu = false;
  }
}
