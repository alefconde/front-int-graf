import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-int-graf';

  @ViewChild('mapContainer')
  mapContainer: ElementRef;

  selected: {
    year1: number,
    month1: number,
    year2: number,
    month2: number,
  } = {
      year1: 0,
      month1: 0,
      year2: 0,
      month2: 0
    }

  selectImpar = false;

  province: string = "07";

  widthMap = 0;
  heightMap = 0;

  ngAfterViewInit() {
    this.widthMap = this.mapContainer.nativeElement.offsetWidth - 40;
    this.heightMap = this.mapContainer.nativeElement.offsetHeight - 40;
  }

  onResized(event: ResizedEvent): void {
    this.widthMap = Math.round(event.newRect.width) - 40;
    this.heightMap = Math.round(event.newRect.height) -40;
  }


  changeMonth(event: any): void {
    if (!((this.selected.year1 == event.year && this.selected.month1 == event.month) || (this.selected.year2 == event.year && this.selected.month2 == event.month))) {
      if (event.year < this.selected.year1 || (event.year == this.selected.year1 && (event.month as number) <= (this.selected.month1 as number)) || this.selected.year1 == 0 || this.selected.month1 == 0) {
        this.selected.year1 = event.year;
        this.selected.month1 = event.month;
      }
      else if (event.year < this.selected.year2 || (event.year == this.selected.year2 && event.month <= this.selected.month2)) {
        if (this.selectImpar) {
          this.selected.year1 = +event.year;
          this.selected.month1 = +event.month;
          this.selectImpar = false;
        }
        else {
          this.selected.year2 = +event.year;
          this.selected.month2 = +event.month;
          this.selectImpar = true;
        }

      }
      else {
        this.selected.year2 = +event.year;
        this.selected.month2 = +event.month;
      }
      if (this.selected.year2 != 0 && this.selected.month2 != 0) {
        if (this.selected.year2 < this.selected.year1 || (this.selected.year2 == this.selected.year1 && this.selected.month2 < this.selected.month1)) {
          let aux = this.selected.year1;
          this.selected.year1 = this.selected.year2;
          this.selected.year2 = aux;
          aux = this.selected.month1;
          this.selected.month1 = this.selected.month2;
          this.selected.month2 = aux;
        }
      }
    }
  }

  changeMonthControls(event: any): void {
    if (event.date2) {
      this.selected.year2 = +event.year;
      this.selected.month2 = +event.month;
    }
    else {
      this.selected.year1 = +event.year;
      this.selected.month1 = +event.month;
    }

    if (this.selected.year2 != 0 && this.selected.month2 != 0) {
      if (this.selected.year2 < this.selected.year1 || (this.selected.year2 == this.selected.year1 && this.selected.month2 < this.selected.month1)) {
        let aux = this.selected.year1;
        this.selected.year1 = this.selected.year2;
        this.selected.year2 = aux;
        aux = this.selected.month1;
        this.selected.month1 = this.selected.month2;
        this.selected.month2 = aux;
      }
      if (this.selected.year2 == this.selected.year1 && this.selected.month2 == this.selected.month1) {
        this.selected.year2 = 0;
        this.selected.month2 = 0;
      }
    }
  }

  changeProvince(event: any): void {
    this.province = event.province;
  }

  changeProvinceControls(event: any): void {
    this.province = event.province;
  }

}
