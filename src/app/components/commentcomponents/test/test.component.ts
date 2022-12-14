import {Component, OnInit} from '@angular/core';
import {Comment} from "../../../../models/Comment";

@Component({
  selector: 'app-test', templateUrl: './test.component.html', styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  comments = new Array<Comment>();

  constructor() {
  }

  ngOnInit(): void {
    let com1 = new Comment();
    let com2 = new Comment();
    com1.id = 1;
    com1.commentMessage = "COM1"
    com1.createDateTime = new Date(1670421040315)
    com1.updateDateTime = new Date(1670422040315)
    com2.id = 2;
    com2.commentMessage = "COM2"
    com2.createDateTime = new Date(1670421040315)
    com2.updateDateTime = new Date(1670422040315)

    this.comments.push(com1);
    this.comments.push(com2);
  }

}
