import { bootstrapApplication } from '@angular/platform-browser';
import { MsalRedirectComponent } from '@azure/msal-angular';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .then(appref => appref.bootstrap(MsalRedirectComponent))
  .catch((err) => console.error(err));
