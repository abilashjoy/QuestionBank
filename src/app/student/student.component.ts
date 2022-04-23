import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  readonly root_url = environment.root_url;
  courses: any;
  departments: any;
  dep_id!: number;
  semester!: number;
  course_id!: number;
  papers: any;

  ngOnInit(): void {
    this.papers = [];
    this.getDepartments();
  }

  constructor(
    private auth_service: AuthService
  ) { }

  getDepartments() {
    this.departments = [];
    this.auth_service.getDepartments().subscribe(
      (res: any) => {
        console.log(res);
        this.departments = res.departments;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getCourses(dep_id: any) {
    this.courses = [];
    console.log(dep_id);

    this.auth_service.getCourses(dep_id).subscribe(
      (res: any) => {
        console.log(res);
        if (res.courses.length > 0) {
          this.courses = res.courses;
          this.course_id = res.courses[0].id;
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getQuestions() {
    console.log(this.semester);
    console.log(this.dep_id);
    console.log(this.course_id);

    let data = {
      dep_id: this.dep_id,
      course_id: this.course_id,
      semester: this.semester
    };
    this.auth_service.getStudentsPapers(data).subscribe((res: any) => {
      console.log(res);

      this.papers = res.questions;
    });
  }


}
