import { Component, Input } from '@angular/core';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent {
  @Input() course?: Course;
  id: number = 1;

  color: string = 'rgb(255, 162, 0)';
}
