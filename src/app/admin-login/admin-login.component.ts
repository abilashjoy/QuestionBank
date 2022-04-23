import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
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
          this._router.navigate(['/Admin']);
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
