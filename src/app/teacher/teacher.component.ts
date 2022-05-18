import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent implements OnInit {
  departments: any;
  courses: any;

  question_form: FormGroup;
  years: any;
  year!: number;

  constructor(
    private toastr: ToastrService,
    private auth_service: AuthService,
    private form_builder: FormBuilder
  ) {
    this.question_form = this.form_builder.group({
      dep_id: new FormControl('', Validators.required),
      course_id: new FormControl('', Validators.required),
      semester: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required),
      year_id: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getDepartments();
    this.years = [];

    this.auth_service.getAllYears().subscribe((res: any) => {
      console.log(res);
      this.years = res.data;
    });
  }
  onAlert(): void {
    alert('Question Paper uploaded successfully');
  }

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
        this.courses = res.courses;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  /**
   * to upload applicant's photo
   * 
   * @param event 
   * @returns 
   */
   uploadFile(event: any) {
    console.warn(event);
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const size = event.target.files[0].size;
      const type = event.target.files[0].type;
      console.log(size);
      console.log(type);

      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.question_form.patchValue({
          file: file,
        });
      }
      // ChangeDetectorRef since file is loading outside the zone
      console.log(event);

    }
  }

  uploadQuestion() {
    console.log(this.question_form.value);
    
    if (this.question_form.invalid) {
      this.toastr.warning('Invalid Input');
    } else {
      let form_data = new FormData();

      form_data.append('dep_id', this.question_form.get('dep_id')?.value);
      form_data.append('course_id', this.question_form.get('course_id')?.value);
      form_data.append('semester', this.question_form.get('semester')?.value);
      form_data.append('question', this.question_form.get('file')?.value);
      form_data.append('year_id', this.question_form.get('year_id')?.value);

      this.auth_service.addPaper(form_data).subscribe((res: any) => {
        console.log(res);
        
        if (res.success) {
          this.toastr.success(res.message);
          this.question_form.reset();
        } else {
          this.toastr.warning(res.message);
        }
      });
    }
  }
}
