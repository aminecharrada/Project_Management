import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  imageUrl = "assets/images/logoEnovaRobotics.png";

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: Event) {
    const currentScroll = window.pageYOffset;
    const menu = document.querySelector(".navbar");
    if (menu) {
      if (currentScroll > 100) {
        menu.classList.add("scroll-down");
      } else {
        menu.classList.remove("scroll-down");
      }
    }
  }
}
