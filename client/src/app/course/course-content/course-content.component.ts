import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from 'src/app/shared/models/course';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Topic } from 'src/app/shared/models/topic';
import { CourseCreator } from 'src/app/shared/models/courseCreator';
import { Student } from 'src/app/shared/models/student';
import { Feedback } from 'src/app/shared/models/feedback';

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
  students: Student[] = [];
  isUserCreator = false;

  courseCreator: CourseCreator = {
    nickname: '',
    email: '',
    profilePictureUrl: '',
  };

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id == null) {
      return;
    }

    this.courseId = +id;

    this.getCourse();
    this.getCourseCreator();
    this.getCourseTopics();
    this.getCourseStudents();
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

  getCourseTopics() {
    this.courseService.getCourseTopics(this.courseId).subscribe({
      next: (r) => {
        this.topics = r;
        console.log('Course topics: ', r);
        this.getTopicFeedbacks();
      },
      error: (e) => console.error(e),
    });
  }

  getCourseCreator() {
    this.courseService.getCourseCreator(this.courseId).subscribe({
      next: (r) => (this.courseCreator = r),
      error: (e) => console.error(e),
    });
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

  openStudentModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  studentForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
    ]),
  });

  onStudentSubmit() {
    console.log(this.studentForm.get('email')?.value);
    this.courseService
      .enrollStudent(this.courseId, this.studentForm.get('email')?.value)
      .subscribe({
        next: (r) => {
          this.modalRef.hide();
          console.log(r);
        },
        error: (e) => console.error(e),
      });
  }

  getCourseStudents() {
    this.courseService.getCourseStudents(this.courseId).subscribe({
      next: (r) => (this.students = r),
      error: (e) => console.error(e),
    });
  }

  getTopicFeedbacks() {
    this.topics.forEach((element) => {
      element.feedbacks = this.getTopics(element.id);
    });
  }

  getTopics(topicId: number) {
    let feedbacks: Feedback[] = [];

    this.courseService.getTopicFeedbacks(topicId).subscribe({
      next: (r) => {
        feedbacks = r;
      },
      error: (e) => console.error(e),
    });

    return feedbacks;
  }
}
