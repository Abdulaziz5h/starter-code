import { AuthEffects } from '@app/store/auth/effects';
import { UserEffects } from './store/users/effects';
import { appReducer } from './store/app.state';
import { environment } from './../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, components } from './app-routing.module';

import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './views/shared/shared.module';

import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { NavbarComponent } from './views/layout/navbar/navbar.component';
import { LoadingComponent } from './views/layout/loading/loading.component';
import { SharedEffects } from './store/shared/effects';
import { QuestionEffects } from './store/questions/effects';

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
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      AuthEffects,
      UserEffects,
      SharedEffects,
      QuestionEffects,
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
