import { Component, Input, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Topic } from 'src/app/shared/models/topic';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent {
  @Input() topic?: Topic;

  feedback: string = '';

  constructor(
    private modalService: BsModalService,
    public modalRef: BsModalRef
  ) {}

  openTopicContent(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-75percent-width',
    });
  }

  onSubmit() {
    console.log(this.feedback);
    this.feedback = '';
  }

  onFeedbackSubmit() {}
}
