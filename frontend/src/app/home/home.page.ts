import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }
  currentDateTime: string = '';
  private timer: any;

  ngOnInit() {
    this.setCurrentDateTime();

    //change date-time in every second
    this.timer = setInterval(() => {
      this.setCurrentDateTime();
    }, 1000);
  }

  ngOnDestroy() {
   //cleaning the component avoiding memory leaks
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  setCurrentDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    this.currentDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
  }

}
