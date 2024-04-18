import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CourseContentComponent } from './course/course-content/course-content.component';

const routes: Routes = [
  { path: '', component: CourseComponent, data: { breadcrumb: 'Studify' } },
  {
    path: 'courses/:id',
    component: CourseContentComponent,
    data: { breadcrumb: { alias: 'courseName' } },
  },
  { path: '**', redirectTo: 'courses', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
