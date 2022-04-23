import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.scss']
})
export class TeacherLoginComponent implements OnInit {

  login_form: FormGroup;

  constructor(
    public _router: Router,
    private auth_service: AuthService,
    private form_builder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.login_form = this.form_builder.group({
      user_name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  login(): void {

    if (this.login_form.invalid) {
      this.toastr.warning('Invalid Input');
    } else {
      this.auth_service.login(this.login_form.value).subscribe((res: any) => {
        console.log(res);
        
        if (res.sucess) {
          this.toastr.success(res.message);
          this.login_form.reset();
          this._router.navigate(['/Teacher']);
        } else {
          this.toastr.error(res.message);
        }
      }, (error: any) => {
        console.error(error);

        this.toastr.error(error.error.error.error_message);
      });
    }
  }
  

}
