import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventPlanningComponent } from './components/event-planning/event-planning.component';
import { EventsListComponent } from './components/events-list/events-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: EventsListComponent },
  { path: 'planning', component: EventPlanningComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { } 