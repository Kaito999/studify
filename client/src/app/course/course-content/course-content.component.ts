import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from 'src/app/shared/models/course';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';
import { Topic } from 'src/app/shared/models/topic';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss'],
})
export class CourseContentComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private breadcrumbService: BreadcrumbService,
    private modalService: BsModalService,
    public modalRef: BsModalRef
  ) {}
  courseId = 0;
  course: any;
  topics: Topic[] = [];
  isUserCreator = false;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id == null) {
      return;
    }

    this.courseId = +id;

    this.getCourse();
    this.getCourseTopics();
  }

  getCourse() {
    this.courseService.getCourse(this.courseId).subscribe({
      next: (r: Course) => {
        this.course = r;
        this.breadcrumbService.set('@courseName', this.course.title);
      },
      error: (e) => console.error(e),
    });

    this.isUserCourseCreator();
  }

  isUserCourseCreator() {
    this.courseService.isUserCourseCreator(this.courseId).subscribe({
      next: (r) => (this.isUserCreator = r),
      error: (e) => console.error(e),
    });
  }

  openTopicModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  topicForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
    ]),
  });

  onTopicSubmit() {
    this.courseService
      .addTopic(this.courseId, this.topicForm.get('title')?.value)
      .subscribe({
        next: (r: Topic) => {
          this.getCourseTopics();
          this.modalRef.hide();
        },
        error: (e) => console.error(e),
      });
  }

  getCourseTopics() {
    this.courseService.getCourseTopics(this.courseId).subscribe({
      next: (r) => {
        this.topics = r;
        console.log('Course topics: ', r);
      },
      error: (e) => console.error(e),
    });
  }
}
