import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectsComponent } from './projects/projects.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { GanttModule, EditService, ToolbarService } from '@syncfusion/ej2-angular-gantt';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgChartsModule } from 'ng2-charts';
import * as Highcharts from 'highcharts';
import { PolesComponent } from './poles/poles.component';
import { GanttComponent } from './gantt/gantt.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { KPIComponent } from './kpi/kpi.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { GridComponentComponent } from './grid-component/grid-component.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { BarChartCardComponent } from './cards/bar-chart-card/bar-chart-card.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { TauxbarChartCardComponent } from './cards/tauxbar-chart-card/tauxbar-chart-card.component';
import { ProgressbarChartComponent } from './charts/progressbar-chart/progressbar-chart.component';
import { ProgressbarChartCardComponent } from './cards/progressbar-chart-card/progressbar-chart-card.component';
import { EcartChartComponent } from './charts/ecart-chart/ecart-chart.component';
import { EcartChartCardComponent } from './cards/ecart-chart-card/ecart-chart-card.component';
import { MatContactDialogComponent } from './people/mat-contact-dialog/mat-contact-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import { AvatarModule } from 'ngx-avatar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogPoleComponent } from './poles/mat-dialog-pole/mat-dialog-pole.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogProjectComponent } from './projects/mat-dialog-project/mat-dialog-project.component';
import { TauxbarChartComponent } from './charts/tauxbar-chart/tauxbar-chart.component';
import { NzCardModule } from 'ng-zorro-antd/card';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    PeopleListComponent,
    NavbarComponent,
    ProjectsComponent,
    PolesComponent,
    GanttComponent,
    KPIComponent,
    GridComponentComponent,
    BarChartCardComponent,
    BarChartComponent,
    TauxbarChartComponent,
    TauxbarChartCardComponent,
    ProgressbarChartComponent,
    ProgressbarChartCardComponent,
    EcartChartComponent,
    EcartChartCardComponent,
    MatContactDialogComponent,
    MatDialogPoleComponent,
    MatDialogProjectComponent,
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTableModule,
    NgCircleProgressModule.forRoot({
      radius: 60,
      space: -10,
      outerStrokeGradient: true,
      outerStrokeWidth: 10,
      outerStrokeColor: "#4882c2",
      outerStrokeGradientStopColor: "#53a9ff",
      innerStrokeWidth: 10,
      innerStrokeColor: "#e7e8ea",
      title: 'auto',
      titleColor: "Red",
      titleFontSize: "20",
      titleFontWeight: "900",
      animateTitle: false,
      animationDuration: 100,
      showUnits: true,
      showBackground: false,
      clockwise: false,
      startFromZero: false,
    }),
    MatProgressBarModule,
    MatCardModule,
    NgChartsModule,
    HttpClientModule,
    GanttModule,
    HighchartsChartModule,
    MatToolbarModule,
    FormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzGridModule,
    NzCardModule,
    NzAvatarModule,
    MatListModule,
    MatDialogModule,
    // AvatarModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [EditService, ToolbarService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    Highcharts.setOptions({
      lang: {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        resetZoom: 'Reset zoom'
      }
    });
  }
}
