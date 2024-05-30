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
  isUserCreator = false;
  summarySize: number = 1;
  selectedFile: any;
  selectedFileId: number = 0;
  selectedFileName: string = '';
  summarizedText: string = '';

  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024;

  @Input() topic?: Topic;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.getFilesMetadata();
    this.isUserCourseCreator();
  }

  selectFile(file: DocumentMetadata) {
    if (this.selectedFile) {
      this.selectedFile.isSelected = false;
    }
    this.selectedFile = file;
    this.selectedFileId = file.id;
    this.selectedFileName = this.getDisplayName(file.name);
    this.selectedFile.isSelected = true;
  }

  summarize() {
    if (this.selectedFileId == 0) return;

    this.courseService
      .getFileSummarization(this.selectedFileId, this.summarySize)
      .subscribe({
        next: (r) => (this.summarizedText = r),
        error: (e) => console.error(e),
      });
  }

  isUserCourseCreator() {
    if (this.topic == null) return;

    this.courseService.isUserCourseCreator(this.topic.courseId).subscribe({
      next: (r) => (this.isUserCreator = r),
      error: (e) => console.error(e),
    });
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

  downloadFile(file: DocumentMetadata, event: MouseEvent) {
    event.stopPropagation();
    this.courseService.downloadFile(file.id).subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: response.type });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        a.click();
        window.URL.revokeObjectURL(url);
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
      const isValidSize = file.size <= this.MAX_FILE_SIZE;
      const isValidExtension =
        !!extension &&
        [
          'pdf',
          'docx',
          'doc',
          'pptx',
          'ppt',
          'txt',
          'png',
          'jpg',
          'zip',
          'rar',
          'xls',
        ].includes(extension);

      if (!isValidSize) {
        alert(`File ${file.name} exceeds the maximum size of 10MB.`);
      }

      return isValidSize && isValidExtension;
    });
  }

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.setDropzoneBorderColor('#007bff');
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.setDropzoneBorderColor('#007bff');
    if (!event.dataTransfer || event.dataTransfer.files.length === 0) {
      this.setDropzoneBorderColor('#cccccc');
    }
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
    this.setDropzoneBorderColor('#cccccc');
  }

  private setDropzoneBorderColor(color: string): void {
    const dropzone = document.querySelector('.dropzone') as HTMLElement;
    if (dropzone) {
      dropzone.style.borderColor = color;
    }
  }

  private addFilesToList(files: File[]): void {
    this.inputFiles = this.inputFiles.concat(files);
  }

  getIconPath(fileName: string): string {
    const extension = this.getFileExtension(fileName);
    switch (extension) {
      case 'pdf':
        return '../../../assets/images/file_icons/pdf.png';
      case 'png':
        return '../../../assets/images/file_icons/image.png';
      case 'jpg':
        return '../../../assets/images/file_icons/image.png';
      case 'doc':
        return '../../../assets/images/file_icons/word.png';
      case 'docx':
        return '../../../assets/images/file_icons/word.png';
      case 'pptx':
        return '../../../assets/images/file_icons/ppt.png';
      case 'ppt':
        return '../../../assets/images/file_icons/ppt.png';
      case 'txt':
        return '../../../assets/images/file_icons/txt.png';
      case 'zip':
        return '../../../assets/images/file_icons/folder.png';
      case 'rar':
        return '../../../assets/images/file_icons/folder.png';
      case 'xls':
        return '../../../assets/images/file_icons/xls.png';
      default:
        return '';
    }
  }

  getDisplayName(fileName: string): string {
    const MAX_DISPLAY_LENGTH = 26;
    const extension = this.getFileExtension(fileName);
    const nameWithoutExtension = fileName.substring(
      0,
      fileName.length - extension.length - 1
    );
    if (fileName.length > MAX_DISPLAY_LENGTH) {
      return (
        nameWithoutExtension.substring(0, MAX_DISPLAY_LENGTH) +
        '...' +
        extension
      );
    } else {
      return fileName;
    }
  }

  getFileExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() || '';
  }
}
