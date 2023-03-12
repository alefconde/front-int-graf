import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline-year',
  templateUrl: './timeline-year.component.html',
  styleUrls: ['./timeline-year.component.scss']
})
export class TimelineYearComponent implements OnInit {

  months = [1,2,3,4];
  widthExp: number = 0;
  constructor() { }

  ngOnInit(): void {

    this.widthExp = 235 * this.months.length - 35;
    
  }

}
