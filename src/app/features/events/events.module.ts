import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPlanningComponent } from './components/event-planning/event-planning.component';
import { EventsListComponent } from './components/events-list/events-list.component';



@NgModule({
  declarations: [
    EventPlanningComponent,
    EventsListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EventsModule { }
