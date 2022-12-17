import {Component, OnInit} from '@angular/core';
import {CompanyService} from 'src/app/services/company/company.service';
import {UserService} from 'src/app/services/user/user.service';
import {Company} from 'src/models/Company';
import {Router} from "@angular/router";
import {NotificationsComponent} from "../../commoncomponents/notifications/notifications.component";
import {MatTableDataSource} from "@angular/material/table";
import {User} from 'src/models/User';
import {JoinCompanyRequest} from "../../../../models/JoinCompanyRequest";

@Component({
  selector: 'app-companyregistration',
  templateUrl: './companyregistration.component.html',
  styleUrls: ['./companyregistration.component.css']
})
export class CompanyregistrationComponent implements OnInit {

  companyi: Company;
  registration = false

  displayedColumns: string[] = ['name', 'actions'];
  companies = new MatTableDataSource<Company>();
  user: User;
  joinRequests = new Array<JoinCompanyRequest>();

  constructor(private companyService: CompanyService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.companyService.getAllCompany().subscribe(companies => {
      companies.forEach(company => this.companies.data.push(company));
      this.companies._updateChangeSubscription();
    });
    this.companyService.getJoinRequests().subscribe(requests => this.joinRequests = requests)
  }


  registerCompany(name: string): void {
    this.companyService.createCompany(name).subscribe(company => {
      NotificationsComponent.notification("Company registration success");
      this.router.navigate(['home']);
    });
  }

  sendJoinRequest(companyId: number): void {
    this.companyService.sendJoinRequest(companyId).subscribe(res => {
      this.joinRequests.push(res);
      NotificationsComponent.notification("Join request sended successfully");
    });
  }

  isRequested(company: Company) {
    let ret = false;
    // @ts-ignore
    this.joinRequests.forEach(request => {
      if (request.company.id == company.id) {
        ret = true
      }
    })
    return ret;
  }

  requestStatus(company: Company) {
    let toret = ""
    // @ts-ignore
    this.joinRequests.forEach(request => {
      if (request.company.id == company.id) {
        toret = request.requestStatus
      }
    })
    return toret;
  }

  setvisibleaddteam() {
    this.registration = !this.registration;
  }

}
