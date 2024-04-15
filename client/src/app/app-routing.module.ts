import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CourseContentComponent } from './course/course-content/course-content.component';

const routes: Routes = [
  { path: 'courses', component: CourseComponent },
  { path: 'courses/:id', component: CourseContentComponent },
  { path: '**', redirectTo: 'courses', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
