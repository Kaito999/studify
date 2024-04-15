import { Creator } from './creator';
import { Topic } from './topic';

export interface Course {
  courseId: number;
  title: string;
  imageUrl: string;
  creatorId: string;
  creator: Creator;
  topics: Topic[];
}
