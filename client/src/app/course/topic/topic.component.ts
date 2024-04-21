import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Topic } from 'src/app/shared/models/topic';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent {
  @Input() topic?: Topic;
  @Output() topicAdded: EventEmitter<void> = new EventEmitter<void>();

  feedback: string = '';

  constructor(
    private modalService: BsModalService,
    public modalRef: BsModalRef,
    private courseService: CourseService
  ) {}

  openTopicContent(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-75percent-width',
    });
  }

  onFeedbackSubmit() {
    if (this.topic == null || this.feedback.length < 5) return;

    this.courseService
      .addTopicFeedback(this.topic.id, this.feedback)
      .subscribe({
        next: (r) => {
          console.log(r);
          console.log(this.formatISODate(r.uploadTime));
        },
        error: (e) => console.error(e),
      });

    this.feedback = '';
  }

  formatISODate(isoDateString: string): string {
    const currentDate: Date = new Date(isoDateString);

    const formattedDate: string = currentDate.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const formattedTime: string = currentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
  }
}
