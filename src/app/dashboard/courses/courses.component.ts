import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-courses',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  courses: Course[] = [];
  categories: any[] = [];
instructors: any[] = [];

  constructor(private courseService:CourseService){
  
  }

  ngOnInit(): void {
    this.loadCourses();
    
  }
   loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
      this.courses = data;
      this.extractCategoriesAndInstructors(data);
    },
      error: (err) => console.error('Error fetching courses:', err)
    });
  }
selectedCategory = '';
  selectedInstructor = '';


extractCategoriesAndInstructors(courses: Course[]): void {
  this.categories = [...new Set(courses.map(course => course.category))];
  this.instructors = [...new Set(courses.map(course => course.instructor))];
}
  
  filteredCourses() {
    return this.courses.filter(course =>
      (!this.selectedCategory || course.category === this.selectedCategory) &&
      (!this.selectedInstructor || course.instructor === this.selectedInstructor)
    );
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  clearFilters() {
    this.selectedCategory = '';
    this.selectedInstructor = '';
  }

}
