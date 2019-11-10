import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { SampleAComponent } from './sample-a/sample-a.component';
import { SampleBComponent } from './sample-b/sample-b.component';
import { SharedModule } from './shared/shared.module';
import { SampleCComponent } from './sample-c/sample-c.component';
import { CoreModule } from './core/core.module';
import { SampleDComponent } from './sample-d/sample-d.component';

const routes: Route[] = [
  { path: 'sample-a', component: SampleAComponent },
  { path: 'sample-b', component: SampleBComponent },
  { path: 'sample-c', component: SampleCComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SampleAComponent,
    SampleBComponent,
    SampleCComponent,
    SampleDComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(routes),
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
