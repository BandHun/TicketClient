import {Component, OnInit} from '@angular/core';
import {CompanyService} from 'src/app/services/company/company.service';
import {UserService} from 'src/app/services/user/user.service';
import {Company} from 'src/models/Company';
import {Router} from "@angular/router";
import {NotificationsComponent} from "../../commoncomponents/notifications/notifications.component";
import {MatTableDataSource} from "@angular/material/table";
import {User} from 'src/models/User';

@Component({
  selector: 'app-companyregistration',
  templateUrl: './companyregistration.component.html',
  styleUrls: ['./companyregistration.component.css']
})
export class CompanyregistrationComponent implements OnInit {

  companyi: Company;

  displayedColumns: string[] = ['id', 'name', 'actions'];
  companies = new MatTableDataSource<Company>();
  user: User;

  constructor(private companyService: CompanyService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.companyService.getAllCompany().subscribe(companies => {
      companies.forEach(company => this.companies.data.push(company));
      this.companies._updateChangeSubscription();
    });
  }


  registerCompany(name: string): void {
    this.companyService.createCompany(name).subscribe(company => {
      NotificationsComponent.notification("Company registration success");
      this.router.navigate(['home']);
    });
  }

  join(companyId: number) {
    this.user = JSON.parse(localStorage.getItem('currentuser'));
    if (this.user.company != null) {
      NotificationsComponent.notification("You already have a company! Leave befor join an otherone!");
      return;
    }
    this.companyService.joinCompany(companyId).subscribe(() => {
      NotificationsComponent.notification("Joined company successfully");
      this.router.navigate(['/home']);
    })
  }

  /*sendJoinRequest(companyId: number): void {
    this.companyService.sendJoinRequest(companyId).subscribe(res => {
      console.log(res)
      console.log("Siker")
      NotificationsComponent.notification("Join request sended successfully");
    });
  }*/

}
