import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Topic } from 'src/app/shared/models/topic';
import { CourseService } from '../course.service';
import { DocumentMetadata } from 'src/app/shared/models/documentMetadata';

@Component({
  selector: 'app-topic-content',
  templateUrl: './topic-content.component.html',
  styleUrls: ['./topic-content.component.scss'],
})
export class TopicContentComponent implements OnInit {
  inputFiles: File[] = [];
  filesMetadata: DocumentMetadata[] = [];

  @Input() topic?: Topic;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.getFilesMetadata();
  }

  uploadFiles() {
    if (this.topic == null) return;

    this.courseService.uploadFiles(this.inputFiles, this.topic.id).subscribe({
      next: (r) => {
        console.log('Files uploaded successfully.', r);
        this.inputFiles = [];
        this.getFilesMetadata();
      },
      error: (e) => console.error(e),
    });
  }

  getFilesMetadata() {
    if (this.topic == null) return;
    this.courseService.getFilesMetadata(this.topic.id).subscribe({
      next: (r) => (this.filesMetadata = r),
      error: (e) => console.error(e),
    });
  }

  selectFiles(): void {
    const inputElement: HTMLInputElement | null = document.querySelector(
      '.dropzone input[type="file"]'
    );
    if (inputElement) {
      inputElement.click();
    }
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const files = Array.from(inputElement.files);
      const validFiles = this.filterValidFiles(files);
      console.log('Valid files selected:', validFiles);
      this.addFilesToList(validFiles);
    }
  }

  private filterValidFiles(files: File[]): File[] {
    return files.filter((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return (
        !!extension &&
        [
          '.pdf',
          '.docx',
          '.doc',
          '.pptx',
          '.ppt',
          '.txt',
          '.png',
          '.jpg',
        ].includes('.' + extension)
      );
    });
  }

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dataTransfer = event.dataTransfer;
    if (dataTransfer) {
      const files = Array.from(dataTransfer.files);
      const validFiles = this.filterValidFiles(files);
      console.log('Valid files dropped:', validFiles);
      this.addFilesToList(validFiles);
    }
  }

  private addFilesToList(files: File[]): void {
    this.inputFiles = this.inputFiles.concat(files);
  }
}
