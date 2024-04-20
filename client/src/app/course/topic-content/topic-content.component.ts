import { Component, Input } from '@angular/core';
import { Topic } from 'src/app/shared/models/topic';

@Component({
  selector: 'app-topic-content',
  templateUrl: './topic-content.component.html',
  styleUrls: ['./topic-content.component.scss'],
})
export class TopicContentComponent {
  @Input() topic?: Topic;

  constructor() {}
}
