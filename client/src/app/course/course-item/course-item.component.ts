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

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent {
  @Input() course?: Course;
  @Output() courseDeleted: EventEmitter<void> = new EventEmitter<void>();

  color: string = 'rgb(255, 177, 41)';

  constructor(
    private modalService: BsModalService,
    public modalRef: BsModalRef,
    private courseService: CourseService,
    public accountService: AccountService
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
        next: () => this.courseDeleted.emit(),
        error: (e) => console.log(e),
      });
  }
}
