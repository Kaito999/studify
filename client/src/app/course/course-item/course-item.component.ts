import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AccountService } from 'src/app/account/account.service';
import { Course } from 'src/app/shared/models/course';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent {
  @Input() course?: Course;

  color: string = 'rgb(255, 162, 0)';

  courseTitle: string = '';

  constructor(
    private modalService: BsModalService,
    public modalRef: BsModalRef,
    private courseService: CourseService,
    public accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit(): void {
    this.modalRef.hide();
  }

  deleteCourse() {
    if (this.course != null)
      this.courseService.deleteCourse(this.course.courseId).subscribe({
        next: (r) => console.log(),
      });
  }
}
