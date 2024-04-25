import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { CoreModule } from '../core/core.module';
import { CourseItemComponent } from './course-item/course-item.component';
import { SharedModule } from '../shared/shared.module';
import { CourseContentComponent } from './course-content/course-content.component';
import { RouterModule } from '@angular/router';
import { CourseHeaderComponent } from './course-header/course-header.component';
import { TopicComponent } from './topic/topic.component';
import { TopicContentComponent } from './topic-content/topic-content.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { FeedbackChartsComponent } from './feedback-charts/feedback-charts.component';

@NgModule({
  declarations: [
    CourseComponent,
    CourseItemComponent,
    CourseContentComponent,
    CourseHeaderComponent,
    TopicComponent,
    TopicContentComponent,
    FeedbackChartsComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  exports: [CourseComponent, CourseContentComponent, FeedbackChartsComponent],
})
export class CourseModule {}
