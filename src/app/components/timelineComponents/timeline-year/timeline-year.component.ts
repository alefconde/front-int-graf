import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { timelineYearModel } from 'src/app/model/timelineYear.model';

@Component({
  selector: 'app-timeline-year',
  templateUrl: './timeline-year.component.html',
  styleUrls: ['./timeline-year.component.scss']
})
export class TimelineYearComponent implements OnInit {

  @Input() year: timelineYearModel;
  @Input() selected: any;
  @Input() province: string;

  @Output() monthChange = new EventEmitter<{year: number, month: number}>();

  widthExp: number = 0;
  constructor() { }

  ngOnInit(): void {

    this.widthExp = 65 * this.year.months.length - 15;
    
  }

  changeMonth(event: any): void {
    this.monthChange.emit({year: event.year, month: event.month});
  }


}
