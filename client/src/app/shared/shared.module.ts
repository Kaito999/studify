import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DynamicIconComponent } from './dynamic-icon/dynamic-icon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [DynamicIconComponent, TextInputComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TabsModule,
  ],
  exports: [
    PaginationModule,
    DynamicIconComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    TabsModule,
  ],
})
export class SharedModule {}
