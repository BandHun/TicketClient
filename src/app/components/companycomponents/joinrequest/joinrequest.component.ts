import {Component, OnInit} from '@angular/core';
import {TicketService} from "../../../services/ticket/ticket.service";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {JoinCompanyRequest, RequestStatus} from "../../../../models/JoinCompanyRequest";
import {CompanyService} from "../../../services/company/company.service";
import {NotificationsComponent} from "../../commoncomponents/notifications/notifications.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-joinrequest', templateUrl: './joinrequest.component.html', styleUrls: ['./joinrequest.component.css']
})
export class JoinrequestComponent implements OnInit {

  displayedColumns: string[] = ['name', 'actions'];
  requests = new MatTableDataSource<JoinCompanyRequest>();

  constructor(private companyService: CompanyService, private ticketsService: TicketService, private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.companyService.getJoinRequestsbycompany().subscribe(res => {
      res.forEach(req => this.requests.data.push(req))
      this.requests._updateChangeSubscription()
    })
  }

  acceptrequest(request: JoinCompanyRequest) {
    this.companyService.acceptJoinRequests(request).subscribe(() => {
      this.requests = new MatTableDataSource<JoinCompanyRequest>();
      this.companyService.getJoinRequestsbycompany().subscribe(res => {
        res.forEach(req => this.requests.data.push(req))
        this.requests._updateChangeSubscription()
      })
      NotificationsComponent.notification(" " + request.user.name + "s request accepted!")
    })
  }

  declinerequest(request: JoinCompanyRequest) {
    this.companyService.declineJoinRequests(request).subscribe(() => {
      this.requests = new MatTableDataSource<JoinCompanyRequest>();
      this.companyService.getJoinRequestsbycompany().subscribe(res => {
        res.forEach(req => this.requests.data.push(req))
        this.requests._updateChangeSubscription()
      })
      NotificationsComponent.notification(" " + request.user.name + "s request declined!")
    })
  }

  isdeclined(request: JoinCompanyRequest) {
    return request.requestStatus === RequestStatus.DECLINED;
  }
}
