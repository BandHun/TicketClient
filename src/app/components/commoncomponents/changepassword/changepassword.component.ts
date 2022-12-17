import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {


  registerForm: FormGroup;
  passwordMatch: Boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit() {
  }

}
