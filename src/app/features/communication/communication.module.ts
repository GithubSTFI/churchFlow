import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewslettersComponent } from './components/newsletters/newsletters.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';



@NgModule({
  declarations: [
    NewslettersComponent,
    AnnouncementsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommunicationModule { }
