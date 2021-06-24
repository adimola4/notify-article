import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { IconsModule } from './icons-module';


import { AppComponent } from './app.component';
import { NotificationHeaderComponent } from './notification-header/notification-header.component';
import { NotificationButtonComponent } from './notification-header/notification-button/notification-button.component';
import { IntersectionObserverDirective } from './core/intersection-observer.directive';

@NgModule({
  declarations: [
    AppComponent,
    NotificationHeaderComponent,
    NotificationButtonComponent,
    IntersectionObserverDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, IconsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
