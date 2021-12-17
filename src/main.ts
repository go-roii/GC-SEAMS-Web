import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));



  // HOW TO BUILD PROJECT

  // ng build --base-href "https://go-roii.github.io/GC-SEAMS-Web/"
  // ngh --dir dist/gc-seams-web