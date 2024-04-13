import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: any = []

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const jwtToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthaXRvQHRlc3QuY29tIiwiZ2l2ZW5fbmFtZSI6ImthaXRvQHRlc3QuY29tIiwibmJmIjoxNzEyOTI1ODQ4LCJleHAiOjE3MTU1MTc4NDgsImlhdCI6MTcxMjkyNTg0OCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMi8ifQ.pIFbw_sk93Cbyda_tyhsfUH9VwB4AEg7xcfzKUgUJogu-LoUgRHNR0yn6cvbBb0gRbAX2Cho_T6cMMTCasCUnQ';

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwtToken);

    this.http.get('https://localhost:5002/api/courses', { headers }).subscribe({
      next: r => this.data = r,
      error: e => console.error(e),
      complete: () => console.log('completed request')
    })
  }
}
