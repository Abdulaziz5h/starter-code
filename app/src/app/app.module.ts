import { UserService } from '@app/services/user.service';
import { AlertService } from './services/alert.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, components } from './app-routing.module';

import { SharedModule } from './views/shared/shared.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './views/layout/navbar/navbar.component';
import { LoadingComponent } from './views/layout/loading/loading.component';
import { LoadingService } from './views/layout/loading/loading.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ...components,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [LoadingService, AlertService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
