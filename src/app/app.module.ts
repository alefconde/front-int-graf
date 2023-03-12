import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { TimelineComponent } from './timelineComponents/timeline/timeline.component';
import { ControlsComponent } from './controls/controls.component';
import { GraphComponent } from './graph/graph.component';
import { TimelineButtonComponent } from './timelineComponents/timeline-button/timeline-button.component';
import { TimelineYearComponent } from './timelineComponents/timeline-year/timeline-year.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { TooltipComponent } from './timelineComponents/tooltip/tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TimelineComponent,
    ControlsComponent,
    GraphComponent,
    TimelineButtonComponent,
    TimelineYearComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
