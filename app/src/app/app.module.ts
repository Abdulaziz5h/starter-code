import { AlertService } from './services/alert.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, components } from './app-routing.module';

import { SharedModule } from './views/shared/shared.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './views/layout/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ...components],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AlertService],
  bootstrap: [AppComponent],
})
export class AppModule {}
