import { Component } from '@angular/core';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-crud',
  imports: [FormsModule,ReactiveFormsModule,CommonModule ],
  templateUrl: './course-crud.component.html',
  styleUrl: './course-crud.component.css'
})
export class CourseCRUDComponent {
updateRow() {
throw new Error('Method not implemented.');
}
courses: Course[] = [];
  
  courseForm!: FormGroup;
  showModal = false;
  editingCourseId: number | null = null;
  editableCourse: Course = {} as Course;

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.initForm();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => (this.courses = data),
      error: (err) => console.error('Error fetching courses:', err)
    });
  }

  initForm(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      category: [''],
      instructor: ['', Validators.required],
      duration: [''],
      startDate: ['', Validators.required],
      fees: ['', [Validators.required, Validators.min(0)]],
      enrolled: [false],
      rating: [0],
      tag: ['']
    });
  }

  openModal(): void {
    this.showModal = true;
    this.courseForm.reset({ enrolled: false, rating: 0 });
    this.editingCourseId = null;
  }

  closeModal(): void {
    this.showModal = false;
    this.courseForm.reset();
  }

  submitForm(): void {
    if (this.courseForm.invalid) return;

    const courseData = this.courseForm.value;

    this.courseService.createCourse(courseData).subscribe({
      next: () => {
        this.loadCourses();
        this.closeModal();
      },
      error: (err) => console.error('Create error:', err)
    });
  }

  editRow(course: Course): void {
    this.editingCourseId = course.id;
    this.editableCourse = { ...course };
  }

  cancelEdit(): void {
    this.editingCourseId = null;
    this.editableCourse = {} as Course;
  }

  saveRow(id: number): void {
    this.courseService.updateCourse(id, this.editableCourse).subscribe({
      next: () => {
        this.loadCourses();
        this.cancelEdit();
      },
      error: (err) => console.error('Update error:', err)
    });
  }

  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => this.loadCourses(),
        error: (err) => console.error('Delete error:', err)
      });
    }
  }
}

