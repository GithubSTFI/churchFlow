import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewMemberComponent } from './components/new-member/new-member.component';
import { MembersListComponent } from './components/members-list/members-list.component';



@NgModule({
  declarations: [
    NewMemberComponent,
    MembersListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MembersModule { }
