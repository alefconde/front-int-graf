import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { TimelineComponent } from './components/timelineComponents/timeline/timeline.component';
import { ControlsComponent } from './components/controls/controls.component';
import { GraphComponent } from './components/graph/graph.component';
import { TimelineButtonComponent } from './components/timelineComponents/timeline-button/timeline-button.component';
import { TimelineYearComponent } from './components/timelineComponents/timeline-year/timeline-year.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { TimelineEventComponent } from './components/timelineComponents/timeline-event/timeline-event.component';
import { AngularResizeEventModule } from 'angular-resize-event';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TimelineComponent,
    ControlsComponent,
    GraphComponent,
    TimelineButtonComponent,
    TimelineYearComponent,
    TimelineEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule,
    AngularResizeEventModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
