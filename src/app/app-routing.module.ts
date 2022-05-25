import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/commoncomponents/login/login.component';
import { HomeComponent } from "./components/commoncomponents/home/home.component";
import { TicketsComponent } from "./components/ticketcomponents/tickets/tickets.component";
import { RegistrationComponent } from './components/usercomponents/registration/registration.component';
import { CompanyregistrationComponent } from "./components/companyregistration/companyregistration.component";
import { TeamsregistrationComponent } from './components/teamcomponents/teamsregistration/teamsregistration.component';
import { TeamseditComponent } from "./components/teamcomponents/teamsedit/teamsedit.component";
import {
  TicketregistrationComponent
} from "./components/ticketcomponents/ticketregistration/ticketregistration.component";
import { TicketeditComponent } from "./components/ticketcomponents/ticketedit/ticketedit.component";
import { ProfileComponent } from "./components/usercomponents/profile/profile.component";
import { TicketdetailsComponent } from './components/ticketcomponents/ticketdetails/ticketdetails.component';
import { ProjectsComponent } from "./components/projectcomponents/projects/projects.component";

const routes: Routes = [
  { path : "login", component : LoginComponent },
  { path : "logout", component : LoginComponent },
  { path : "home", component : HomeComponent },
  { path : "tickets", component : TicketsComponent },
  { path : "ticketedit/:id", component : TicketeditComponent },
  { path : "ticketdetails/:id", component : TicketdetailsComponent },
  { path : "projects", component : ProjectsComponent },
  { path : "companyregistration", component : CompanyregistrationComponent },
  { path : "teamsregistration", component : TeamsregistrationComponent },
  { path : "teamsedit/:id", component : TeamseditComponent },
  { path : "registration", component : RegistrationComponent },
  { path : "createticket", component : TicketregistrationComponent },
  { path : "profile", component : ProfileComponent },
  { path : "", redirectTo : "login", pathMatch : "full" },
];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule {
}
