import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import * as Highcharts from 'highcharts/highcharts-gantt';
import HighchartsGantt from 'highcharts/modules/gantt';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { registerLicense } from '@syncfusion/ej2-base';

// Initialize Highcharts Gantt module
HighchartsGantt(Highcharts);

if (environment.production) {
  enableProdMode();
}
registerLicense("Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCdkx1WmFZfVpgfF9FZFZRQWYuP1ZhSXxXdkJjXX9Wc3BVQGhYWUE=");

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
