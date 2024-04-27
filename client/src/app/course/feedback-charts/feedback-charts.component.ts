import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Topic } from 'src/app/shared/models/topic';
import { BreadcrumbService } from 'xng-breadcrumb';
import { CourseService } from '../course.service';
import { Feedback } from 'src/app/shared/models/feedback';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-feedback-charts',
  templateUrl: './feedback-charts.component.html',
  styleUrls: ['./feedback-charts.component.scss'],
})
export class FeedbackChartsComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @Input() event: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private modalService: BsModalService,
    public modalRef: BsModalRef,
    private breadcrumbService: BreadcrumbService
  ) {}

  courseId = 0;
  topics: Topic[] = [];
  chart: any;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id == null) {
      return;
    }

    this.courseId = +id;
    this.getCourseTopics();
    this.generateChart();
  }

  refreshChart() {
    this.getCourseTopics();
    this.generateChart();
  }

  getCourseTopics() {
    this.courseService.getCourseTopics(this.courseId).subscribe({
      next: (r) => {
        this.topics = r;
        this.getTopicFeedbacks();
      },
      error: (e) => console.error(e),
    });
  }

  getTopicFeedbacks() {
    this.topics.forEach((element) => {
      this.getTopics(element.id).subscribe({
        next: (r) => {
          element.feedbacks = r;
        },
        error: (e) => console.error(e),
      });
    });
  }

  getTopics(topicId: number) {
    return this.courseService.getTopicFeedbacks(topicId);
  }

  generateChart() {
    if (
      !this.chartCanvas ||
      !this.chartCanvas.nativeElement ||
      this.topics.length === 0
    ) {
      return;
    }

    const labels = this.topics.map((topic) => topic.title);
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Positive (%)',
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Negative (%)',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };

    for (const topic of this.topics) {
      const totalFeedbacks = topic.feedbacks.length;
      console.log(topic);

      // Counting positive and negative feedbacks
      const positiveCount = topic.feedbacks.filter(
        (feedback) => feedback.sentimentLabel === 1
      ).length;
      const negativeCount = topic.feedbacks.filter(
        (feedback) => feedback.sentimentLabel === 0
      ).length;

      let pos: number = 0;
      topic.feedbacks.forEach((a) => a.sentimentLabel == 1, pos++);

      // Calculate percentages
      const positivePercentage =
        totalFeedbacks !== 0 ? (positiveCount / totalFeedbacks) * 100 : 0;
      const negativePercentage =
        totalFeedbacks !== 0 ? (negativeCount / totalFeedbacks) * 100 : 0;

      (chartData.datasets[0].data as { x: string; y: number }[]).push({
        x: topic.title,
        y: positivePercentage,
      });
      (chartData.datasets[1].data as { x: string; y: number }[]).push({
        x: topic.title,
        y: negativePercentage,
      });
    }

    const chartOptions = {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });
  }

  summarizeFeedback() {}

  concatenateFeedbacksBySentiment(
    topic: Topic,
    sentimentLabel: number
  ): string {
    let concatenatedText = '';

    if (topic.feedbacks.length <= 0) return '';

    topic.feedbacks.forEach((feedback) => {
      if (feedback.sentimentLabel === sentimentLabel) {
        concatenatedText += feedback.text.trim() + '. ';
      }
    });

    return concatenatedText.trim();
  }
}
