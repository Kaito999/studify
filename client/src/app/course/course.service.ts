import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Course } from '../shared/models/course';
import { CourseParams } from '../shared/models/courseParams';
import { Topic } from '../shared/models/topic';
import { Feedback } from '../shared/models/feedback';
import { DocumentMetadata } from '../shared/models/documentMetadata';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl = 'https://localhost:5002/api/';

  constructor(private http: HttpClient) {}

  private generateHeaders(): HttpHeaders {
    const jwtToken = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', 'Bearer ' + jwtToken);
  }

  getCourses(courseParams: CourseParams) {
    let params = new HttpParams()
      .append('pageIndex', courseParams.pageIndex.toString())
      .append('pageSize', courseParams.pageSize.toString());

    const headers = this.generateHeaders();

    return this.http.get<Pagination<Course[]>>(this.baseUrl + 'courses', {
      params,
      headers,
    });
  }

  isUserCourseCreator(courseId: number) {
    const headers = this.generateHeaders();

    return this.http.get<boolean>(
      this.baseUrl + 'courses/iscreator/' + courseId,
      {
        headers,
      }
    );
  }

  getCourse(id: number) {
    const headers = this.generateHeaders();

    return this.http.get<Course>(this.baseUrl + 'courses/' + id, { headers });
  }

  addCourse(title: string) {
    const headers = this.generateHeaders();
    const params = new HttpParams().set('title', title);

    return this.http.post(this.baseUrl + 'courses', null, { params, headers });
  }

  deleteCourse(courseId: number) {
    const headers = this.generateHeaders();
    const params = new HttpParams().set('courseId', courseId.toString());

    return this.http.delete(this.baseUrl + 'courses/delete', {
      params,
      headers,
    });
  }

  addTopic(courseId: number, title: any) {
    const headers = this.generateHeaders();
    const params = new HttpParams()
      .set('courseId', courseId.toString())
      .set('title', title);

    return this.http.post<Topic>(this.baseUrl + 'topics/addtopic', null, {
      params,
      headers,
    });
  }

  getCourseTopics(courseId: number) {
    const headers = this.generateHeaders();
    const params = new HttpParams().set('courseId', courseId.toString());

    return this.http.get<Topic[]>(this.baseUrl + 'topics', {
      params,
      headers,
    });
  }

  addTopicFeedback(topicId: number, text: string) {
    const headers = this.generateHeaders();

    const uploadTime: string = new Date().toISOString();

    return this.http.post<Feedback>(
      this.baseUrl + 'topics/addfeedback',
      { topicId: topicId, text: text, uploadTime: uploadTime },
      {
        headers,
      }
    );
  }

  uploadFiles(files: File[], topicId: number) {
    const headers = this.generateHeaders();

    const formData = new FormData();

    files.forEach((file: File) => {
      formData.append('files', file, file.name);
    });

    formData.append('topicId', topicId.toString());

    return this.http.post<any>(this.baseUrl + 'documents/upload', formData, {
      headers,
    });
  }

  getFilesMetadata(topicId: number) {
    const headers = this.generateHeaders();

    return this.http.get<DocumentMetadata[]>(
      this.baseUrl + 'documents/metadata/' + topicId.toString(),
      {
        headers,
      }
    );
  }
}
