import { Component, HostListener, Input } from '@angular/core';
import { Topic } from 'src/app/shared/models/topic';

@Component({
  selector: 'app-topic-content',
  templateUrl: './topic-content.component.html',
  styleUrls: ['./topic-content.component.scss'],
})
export class TopicContentComponent {
  files: File[] = [];

  @Input() topic?: Topic;

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
    this.files = this.files.concat(files);
  }
}
