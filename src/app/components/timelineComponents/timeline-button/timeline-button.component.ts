import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { timelineMonthModel } from 'src/app/model/timelineMonth.model';
import { Tools } from 'src/app/tools/tools';

@Component({
  selector: 'app-timeline-button',
  templateUrl: './timeline-button.component.html',
  styleUrls: ['./timeline-button.component.scss']
})
export class TimelineButtonComponent implements OnInit {

  @Input() month: timelineMonthModel;
  @Input() year: number;
  @Input() selected: any;
  @Input() province: string;

  @Output() monthChange = new EventEmitter<{ year: number, month: number }>();

  name: string = "";

  selectedMonth: boolean = false;

  constructor() {
    if (this.month)
      this.name = Tools.transformMonthShort(this.month.month);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["month"])
      if (this.month)
        this.name = Tools.transformMonthShort(this.month.month);

  }

  changeMonth(): void {
    if (this.month)
      this.monthChange.emit({ year: this.year, month: this.month.month });
  }

}
