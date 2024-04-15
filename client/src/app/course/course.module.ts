import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { CoreModule } from '../core/core.module';
import { CourseItemComponent } from './course-item/course-item.component';
import { SharedModule } from '../shared/shared.module';
import { CourseContentComponent } from './course-content/course-content.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CourseComponent, CourseItemComponent, CourseContentComponent],
  imports: [CommonModule, CoreModule, SharedModule, RouterModule],
  exports: [CourseComponent, CourseContentComponent],
})
export class CourseModule {}
