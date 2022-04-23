import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  questions: any;

  constructor(
    private auth_service: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.questions = [];
    this.auth_service.getQuestionPapers().subscribe((res: any) => {
      console.log(res);
      this.questions = res.questions;
    }, (error: any) => {
      console.error(error);
    });
  }


  onChangeStatus(status: number, element: any) {
    let data = {
      id: element.id,
      status: status
  };
  
  this.auth_service.acceptOrReject(data).subscribe((res: any) => {
      console.log(res);
      
      if (res.success) {
          this.toastr.success(res.message);
          const index = this.questions.indexOf(element);
  
          if (index >= 0) {
              this.questions.splice(index, 1)
          }
      } else {
          this.toastr.warning(res.message);
      }
  }, (error: any) => {
      console.error(error);
  });
  }
}
