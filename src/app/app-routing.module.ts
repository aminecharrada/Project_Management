import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { ProjectsComponent } from './projects/projects.component';
import { PolesComponent } from './poles/poles.component';
import { GanttComponent } from './gantt/gantt.component';
import { KPIComponent } from './kpi/kpi.component';


const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'people-list',
    component: PeopleListComponent
  },
  { path: 'gantt/pole/:poleName',
    component: GanttComponent },

  { path: 'gantt/:projectName', 
    component: GanttComponent },

   { path: 'gantt', 
    component: GanttComponent },   
    
  { path: 'poles', 
    component: PolesComponent },
    { path: 'kpi', 
      component: KPIComponent},

];
const routerOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload'
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
