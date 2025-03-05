import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './components/inventory/inventory.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';



@NgModule({
  declarations: [
    InventoryComponent,
    MaintenanceComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ResourcesModule { }
