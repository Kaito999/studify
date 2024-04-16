import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course/course.service';
import { Course } from 'src/app/shared/models/course';
import { CourseParams } from 'src/app/shared/models/courseParams';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  courses: Course[] = [];
  courseParams = new CourseParams();

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
      },
      error: (e) => console.error(e),
    });
  }
}
