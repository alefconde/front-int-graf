import { Component, Input, OnInit } from '@angular/core';
import { timelineEventModel } from 'src/app/model/timelineEvent.model';

@Component({
  selector: 'app-timeline-event',
  templateUrl: './timeline-event.component.html',
  styleUrls: ['./timeline-event.component.scss']
})
export class TimelineEventComponent implements OnInit {

  @Input() event: timelineEventModel;

  constructor() { }

  ngOnInit(): void {
  }

}
