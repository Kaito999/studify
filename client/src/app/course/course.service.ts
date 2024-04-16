import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Course } from '../shared/models/course';
import { CourseParams } from '../shared/models/courseParams';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  baseUrl = 'https://localhost:5002/api/';

  constructor(private http: HttpClient) {}

  getCourses(courseParams: CourseParams) {
    const jwtToken =
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthaXRvQHRlc3QuY29tIiwiZ2l2ZW5fbmFtZSI6ImthaXRvQHRlc3QuY29tIiwibmJmIjoxNzEyOTI1ODQ4LCJleHAiOjE3MTU1MTc4NDgsImlhdCI6MTcxMjkyNTg0OCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMi8ifQ.pIFbw_sk93Cbyda_tyhsfUH9VwB4AEg7xcfzKUgUJogu-LoUgRHNR0yn6cvbBb0gRbAX2Cho_T6cMMTCasCUnQ';

    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + jwtToken
    );

    let params = new HttpParams();

    params = params.append('pageIndex', courseParams.pageIndex.toString());
    params = params.append('pageSize', courseParams.pageSize.toString());

    return this.http.get<Pagination<Course[]>>(this.baseUrl + 'courses', {
      params,
      headers,
    });
  }

  getCourse(id: number) {
    const jwtToken =
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthaXRvQHRlc3QuY29tIiwiZ2l2ZW5fbmFtZSI6ImthaXRvQHRlc3QuY29tIiwibmJmIjoxNzEyOTI1ODQ4LCJleHAiOjE3MTU1MTc4NDgsImlhdCI6MTcxMjkyNTg0OCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMi8ifQ.pIFbw_sk93Cbyda_tyhsfUH9VwB4AEg7xcfzKUgUJogu-LoUgRHNR0yn6cvbBb0gRbAX2Cho_T6cMMTCasCUnQ';

    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + jwtToken
    );

    return this.http.get<Course[]>(this.baseUrl + 'courses/' + id, {
      headers,
    });
  }
}
