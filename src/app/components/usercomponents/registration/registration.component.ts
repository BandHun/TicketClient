import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration/registration.service';

class CustomValidators {

  static passwordsMatch(control: AbstractControl): ValidationErrors | null {
    // @ts-ignore
    const password = control.get('password').value;
    // @ts-ignore
    const confirmPassword = control.get('confirmPassword').value;

    if ((password === confirmPassword) && (password !== null && confirmPassword !== null)) {
      return null;
    } else {
      return { passwordsNotMatching : true };
    }
  }
}

@Component({
  selector : 'app-registration',
  templateUrl : './registration.component.html',
  styleUrls : ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // @ts-ignore
  registerForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private registrationService: RegistrationService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name : [null, [Validators.required]],
      emailaddress : [null, [Validators.required, Validators.email, Validators.minLength(6)]],
      password : [null, [Validators.required, Validators.minLength(3)]],
      confirmPassword : [null, [Validators.required, Validators.minLength(3)]]
    })
  }

  onSubmit() {
    if (this.registerForm?.invalid) {
      return;
    }
    this.registrationService.registration(this.registerForm.get('name')?.value,
      this.registerForm.get('emailaddress')?.value,
      this.registerForm.get('password')?.value).subscribe(user => {
      this.router.navigate(['companyregistration']);
      localStorage.setItem('username', this.registerForm.get('emailaddress')?.value);
      localStorage.setItem('password', this.registerForm.get('password')?.value);
      localStorage.setItem('userId', user.id + "");
    });
  }

}
