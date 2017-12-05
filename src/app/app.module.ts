import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { UserService } from 'app/services/user.service';
import { AuthService } from 'app/services/auth.service';
import { GuestComponent } from './layout/guest/guest.component';
import { AuthenticatedComponent } from './layout/authenticated/authenticated.component';
import { GuestGuard } from 'app/guards/guest.guard';
import { MoodService } from 'app/services/mood.service';
import { ServerErrorsPipe } from './server-errors.pipe';
import { AuthInterceptor } from 'app/services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    FormErrorsComponent,
    GuestComponent,
    AuthenticatedComponent,
    ServerErrorsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    AuthGuard,
    GuestGuard,
    UserService,
    AuthService,
    MoodService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
