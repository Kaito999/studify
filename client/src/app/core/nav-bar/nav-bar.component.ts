import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountService } from 'src/app/account/account.service';
import { CourseService } from 'src/app/course/course.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  courseTitle: string = '';

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
    if (this.courseTitle.length < 2) return;
    console.log(this.courseTitle);
    this.courseService.addCourse(this.courseTitle).subscribe({
      next: (r) => console.log(r),
      error: (e) => console.error(e),
    });

    this.modalRef.hide();
  }

  logout() {
    this.accountService.logOut();
  }
}
