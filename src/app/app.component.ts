import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionComponent } from './question/question.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor (private _router:Router){

  }

  onQuestion():void{
    this._router.navigate(['/Question'])
  }
  title = 'QuestionBank';
}
