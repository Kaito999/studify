export interface Feedback {
  id: number;
  topicId: number;
  text: string;
  sentimentLabel: number;
  labelScore: number;
  uploadTime: string;
}
