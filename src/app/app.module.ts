import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/commoncomponents/login/login.component';
import {HomeComponent} from './components/commoncomponents/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginService} from './services/login/login.service';
import {HeaderComponent} from './components/commoncomponents/header/header.component';
import {NavbarComponent} from './components/commoncomponents/navbar/navbar.component';
import {TicketsComponent} from './components/ticketcomponents/tickets/tickets.component';
import {UpdateticketsComponent} from './components/ticketcomponents/updatetickets/updatetickets.component';
import {RegistrationComponent} from './components/usercomponents/registration/registration.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
  CompanyregistrationComponent
} from './components/companycomponents/companyregistration/companyregistration.component';
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TeamsregistrationComponent} from './components/teamcomponents/teamsregistration/teamsregistration.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {TeamseditComponent} from './components/teamcomponents/teamsedit/teamsedit.component';
import {
  TicketregistrationComponent
} from './components/ticketcomponents/ticketregistration/ticketregistration.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {TicketeditComponent} from './components/ticketcomponents/ticketedit/ticketedit.component';
import {ProfileComponent} from './components/usercomponents/profile/profile.component';
import {TicketdetailsComponent} from './components/ticketcomponents/ticketdetails/ticketdetails.component';
import {NotificationsComponent} from './components/commoncomponents/notifications/notifications.component';
import {MatTabsModule} from "@angular/material/tabs";
import {ProjectsComponent} from './components/projectcomponents/projects/projects.component';
import {ProjectdetailsComponent} from './components/projectcomponents/projectdetails/projectdetails.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {JoinrequestComponent} from './components/companycomponents/joinrequest/joinrequest.component';
import {UsersComponent} from './components/usercomponents/users/users.component';
import {TeamtableComponent} from './components/teamcomponents/teamtable/teamtable.component';
import {TokenInterceptorService} from './services/token-interceptor.service';
import {SprintsComponent} from './components/sprintcomponents/sprints/sprints.component';
import {SprinteditComponent} from './components/sprintcomponents/sprintedit/sprintedit.component';
import {UsereditComponent} from './components/usercomponents/useredit/useredit.component';
import {TeamtablesComponent} from './components/teamcomponents/teamtables/teamtables.component';
import {ForgetpswComponent} from './components/usercomponents/forgetpsw/forgetpsw.component';
import {CommentComponent} from './components/commentcomponents/comment/comment.component';
import {TestComponent} from './components/commentcomponents/test/test.component';
import {HourtableComponent} from './components/hourcomponents/hourtable/hourtable.component';
import {TicketboardComponent} from './components/ticketcomponents/ticketboard/ticketboard.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {
  TicketBoardComponentComponent
} from './components/ticketcomponents/ticket-board-component/ticket-board-component.component';
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import { ChangepasswordComponent } from './components/commoncomponents/changepassword/changepassword.component';


@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, HeaderComponent, NavbarComponent, TicketsComponent, UpdateticketsComponent, RegistrationComponent, CompanyregistrationComponent, TeamsregistrationComponent, TeamseditComponent, TicketregistrationComponent, TicketeditComponent, ProfileComponent, TicketdetailsComponent, NotificationsComponent, ProjectsComponent, ProjectdetailsComponent, JoinrequestComponent, UsersComponent, TeamtableComponent, SprintsComponent, SprinteditComponent, UsereditComponent, TeamtablesComponent, ForgetpswComponent, CommentComponent, TestComponent, HourtableComponent, TicketboardComponent, TicketBoardComponentComponent, ChangepasswordComponent,],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, MatInputModule, MatOptionModule, MatSelectModule, BrowserAnimationsModule, MatTableModule, MatPaginatorModule, MatDatepickerModule, MatTabsModule, MatSidenavModule, MatIconModule, MatTooltipModule, MatDatepickerModule, MatButtonModule, MatFormFieldModule, MatNativeDateModule, DragDropModule, MatCardModule, MatRadioModule,],
  providers: [LoginService, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
