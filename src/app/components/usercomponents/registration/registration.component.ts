import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {RegistrationService} from 'src/app/services/registration/registration.service';
import {NotificationsComponent} from "../../commoncomponents/notifications/notifications.component";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  passwordMatch: Boolean;

  constructor(private router: Router, private formBuilder: FormBuilder, private registrationService: RegistrationService) {
    this.passwordMatch = true;
  }

  passwordsMatch(password: string, confirmPassword: string) {
    if ((password === confirmPassword) && (password !== null && confirmPassword !== null)) {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      emailaddress: [null, [Validators.required, Validators.email, Validators.minLength(6)]],
      password: [null, [Validators.required, Validators.minLength(3)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(3)]]
    })
  }

  onSubmit() {
    if (this.registerForm?.invalid) {
      return;
    }
    this.registrationService.registration(this.registerForm.get('name')?.value,
      this.registerForm.get('emailaddress')?.value,
      this.registerForm.get('password')?.value).subscribe(user => {
      this.router.navigate(['/login']);
      NotificationsComponent.notification("Registration completed! Please Log in!")
    }, (err) => {
      NotificationsComponent.notification(err.message)
    });
  }

}
