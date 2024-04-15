import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss'],
})
export class CourseContentComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}
  elementId: number = 0;
  courseName = '';

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.elementId = +id;
    }
  }
}
