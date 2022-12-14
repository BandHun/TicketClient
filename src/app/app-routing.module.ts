import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/commoncomponents/login/login.component';
import {HomeComponent} from "./components/commoncomponents/home/home.component";
import {TicketsComponent} from "./components/ticketcomponents/tickets/tickets.component";
import {RegistrationComponent} from './components/usercomponents/registration/registration.component';
import {
  CompanyregistrationComponent
} from "./components/companycomponents/companyregistration/companyregistration.component";
import {TeamsregistrationComponent} from './components/teamcomponents/teamsregistration/teamsregistration.component';
import {TeamseditComponent} from "./components/teamcomponents/teamsedit/teamsedit.component";
import {
  TicketregistrationComponent
} from "./components/ticketcomponents/ticketregistration/ticketregistration.component";
import {TicketeditComponent} from "./components/ticketcomponents/ticketedit/ticketedit.component";
import {ProfileComponent} from "./components/usercomponents/profile/profile.component";
import {TicketdetailsComponent} from './components/ticketcomponents/ticketdetails/ticketdetails.component';
import {ProjectsComponent} from "./components/projectcomponents/projects/projects.component";
import {JoinrequestComponent} from "./components/companycomponents/joinrequest/joinrequest.component";
import {UsersComponent} from "./components/usercomponents/users/users.component";
import {UsereditComponent} from './components/usercomponents/useredit/useredit.component';
import {SprintsComponent} from './components/sprintcomponents/sprints/sprints.component';
import {SprinteditComponent} from "./components/sprintcomponents/sprintedit/sprintedit.component";
import {TeamtablesComponent} from "./components/teamcomponents/teamtables/teamtables.component";
import {TeamtableComponent} from "./components/teamcomponents/teamtable/teamtable.component";
import {ForgetpswComponent} from './components/usercomponents/forgetpsw/forgetpsw.component';
import {TestComponent} from "./components/commentcomponents/test/test.component";
import {HourtableComponent} from "./components/hourcomponents/hourtable/hourtable.component";
import {TicketboardComponent} from "./components/ticketcomponents/ticketboard/ticketboard.component";


//@formatter:off
const routes: Routes = [//COMMON
  {path: "login", component: LoginComponent},
  {path: "logout", component: LoginComponent},
  {path: "home", component: HomeComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "forgetpassword", component: ForgetpswComponent},

  //TICKETS
  {path: "createticket", component: TicketregistrationComponent},
  {path: "tickets", component: TicketsComponent},
  {path: "ticketedit/:id", component: TicketeditComponent},
  {path: "ticketdetails/:id", component: TicketdetailsComponent},

  //PROJECTS
  {path: "projects", component: ProjectsComponent},

  //COMPANY
  {path: "companyregistration", component: CompanyregistrationComponent},
  {path: "joinrequest", component: JoinrequestComponent},

  //TEAMS
  {path: "teams", component: TeamsregistrationComponent},
  {path: "teamsedit/:id", component: TeamseditComponent},

  //TABLES
  {path: "teamtables", component: TeamtablesComponent},
  {path: "teamtable/:id", component: TeamtableComponent},
  {path: "dargandrop", component: TicketboardComponent},
  {path: "dargandrop/:id", component: TicketboardComponent},


  //USERS
  {path: "profile", component: ProfileComponent}, {path: "users", component: UsersComponent},
  {path: "useredit/:id", component: UsereditComponent},
  {path: "profile/:id", component: ProfileComponent},


  //TESTING
  {path: "test", component: TestComponent},

  //HOURS
  {path: "hours", component: HourtableComponent},

  //SPRINTS
  {path: "sprintcreate/:id", component: SprintsComponent},
  {path: "sprintedit/:id", component: SprinteditComponent},

  {path: "", redirectTo: "home", pathMatch: "full"},];
//@formatter:on
@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
