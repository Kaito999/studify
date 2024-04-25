import { Feedback } from '../feedback';

export interface TopicFeedbacks {
  id: number;
  title: string;
  courseId: number;
  feedbacks: Feedback[];
}
