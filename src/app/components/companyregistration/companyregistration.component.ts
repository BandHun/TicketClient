import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company/company.service';
import { UserService } from 'src/app/services/user/user.service';
import { Company } from 'src/models/Company';
import { Router } from "@angular/router";
import { NotificationsComponent } from "../commoncomponents/notifications/notifications.component";

@Component({
  selector : 'app-companyregistration',
  templateUrl : './companyregistration.component.html',
  styleUrls : ['./companyregistration.component.css']
})
export class CompanyregistrationComponent implements OnInit {

  companies = Array<Company>();
  companyi: Company;

  constructor(private companyService: CompanyService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.companyService.getAllCompany().subscribe(companies => {
      companies.forEach(company => {
        this.companies.push(company);
        console.log(company);
      });
    });
  }

  registerCompany(name: string): void {
    this.companyService.createCompany(name).subscribe(company => {
      this.userService.getById(Number(localStorage.getItem('userId'))).subscribe(user => {
        localStorage.setItem('userId', user.id + "");
        if (user.teams == null) {
          this.router.navigate(['teamsregistration']);
          NotificationsComponent.notification("Company registration success");
        } else {
          this.router.navigate(['home']);
        }
      })


    });
  }

  chooseCompany(): void {
    this.userService.chooseCompany(this.companyi.id).subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
      if (user.teams == null) {
        this.router.navigate(['teamsregistration']);
        NotificationsComponent.notification("Company selection success");
      } else {
        this.router.navigate(['home']);
      }
    });
  }

}
