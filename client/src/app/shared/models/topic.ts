import { Feedback } from './feedback';

export interface Topic {
  id: number;
  title: string;
  courseId: number;
  course: string;
  positiveSummary: string;
  negativeSummary: string;
  feedbacks: Feedback[];
}
