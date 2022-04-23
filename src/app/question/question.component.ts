import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  makePDF() {
    let pdf = new jsPDF();
    pdf.text("hello this is 1st sem English Question paper ", 10, 10);

    pdf.save();
  }

}
