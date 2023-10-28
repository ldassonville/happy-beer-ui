import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DispensersViewerComponent } from './dispensers/dispensers-viewer/dispensers-viewer.component';
import { HttpClientModule } from '@angular/common/http';
import { InternalStatusDispenserFilterPipe } from './dispensers/filters/internal-status-dispenser-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DispensersViewerComponent,
    InternalStatusDispenserFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
