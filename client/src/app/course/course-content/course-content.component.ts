import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from 'src/app/shared/models/course';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss'],
})
export class CourseContentComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private breadcrumbService: BreadcrumbService
  ) {}
  courseId = 0;
  course: any;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id == null) {
      return;
    }

    this.courseId = +id;

    this.getCourse();
  }

  getCourse() {
    this.courseService.getCourse(this.courseId).subscribe({
      next: (r) => {
        this.course = r;
        this.breadcrumbService.set('@courseName', this.course.title);
      },
      error: (e) => console.error(e),
    });
  }
}
