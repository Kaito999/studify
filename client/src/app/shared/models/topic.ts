import { Feedback } from './feedback';

export interface Topic {
  id: number;
  title: string;
  courseId: number;
  course: string;
  documents: Document[];
  feedbacks: Feedback[];
}
