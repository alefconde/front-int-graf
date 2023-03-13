import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { timelineYearModel } from 'src/app/model/timelineYear.model';
import yearsData from '../../../mockData/years.json';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Output() monthChange = new EventEmitter<{year: number, month: number}>();
  @Input() selected: any;

  years = yearsData;
  constructor() { }

  ngOnInit(): void {
  }

  changeMonth(event: any): void {
    this.monthChange.emit({year: event.year, month: event.month});
  }

}
