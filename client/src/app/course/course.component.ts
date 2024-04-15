import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/models/course';
import { CourseService } from './course.service';
import { CourseParams } from '../shared/models/courseParams';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  courses: Course[] = [];
  courseParams = new CourseParams();
  totalCount = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.courseService.getCourses(this.courseParams).subscribe({
      next: (r) => {
        this.courses = r.data;
        this.courseParams.pageIndex = r.pageIndex;
        this.courseParams.pageSize = r.pageSize;
        this.totalCount = r.count; // Update totalCount property name
      },
      error: (e) => console.error(e),
    });
  }

  onPageChanged(event: any) {
    if (this.courseParams.pageIndex !== event.page) {
      this.courseParams.pageIndex = event.page;
      this.getCourses();
    }
  }
}
