import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DynamicIconComponent } from './dynamic-icon/dynamic-icon.component';

@NgModule({
  declarations: [DynamicIconComponent],
  imports: [CommonModule, PaginationModule.forRoot()],
  exports: [PaginationModule, DynamicIconComponent],
})
export class SharedModule {}
