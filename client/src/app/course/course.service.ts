import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Course } from '../shared/models/course';
import { CourseParams } from '../shared/models/courseParams';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  baseUrl = 'https://localhost:5002/api/';

  constructor(private http: HttpClient) {}

  getCourses(courseParams: CourseParams) {
    const jwtToken = localStorage.getItem('token');

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
    const jwtToken = localStorage.getItem('token');

    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + jwtToken
    );

    return this.http.get<Course[]>(this.baseUrl + 'courses/' + id, {
      headers,
    });
  }

  addCourse(title: string) {
    const jwtToken = localStorage.getItem('token');

    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + jwtToken
    );

    let params = new HttpParams().set('title', title);

    return this.http.post(this.baseUrl + 'courses', null, {
      params,
      headers,
    });
  }
}
