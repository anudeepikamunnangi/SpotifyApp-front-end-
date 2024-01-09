import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-top-button',
  templateUrl: './top-button.component.html',
  styleUrls: ['./top-button.component.css']
})
export class TopButtonComponent {
  mybutton: HTMLElement | null = document.getElementById("btn-back-to-top");

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.scrollFunction();
  }

  constructor() {}

  scrollFunction(): void {
    if (
      document.body.scrollTop! > 20 ||
      document.documentElement.scrollTop! > 20
    ) {
      if (this.mybutton) {
        this.mybutton.style.display = "block";
      }
    } else {
      if (this.mybutton) {
        this.mybutton.style.display = "none";
      }
    }
  }

  backToTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}