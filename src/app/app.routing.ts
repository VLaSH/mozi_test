import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestComponent } from 'app/layout/guest/guest.component';
import { AuthenticatedComponent } from 'app/layout/authenticated/authenticated.component';
import { GuestGuard } from 'app/guards/guest.guard';

const guestRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
]
const authenticatedRoutes: Routes = [
  {path: 'user-details', component: UserComponent}
]
const routes: Routes = [
  {path: '', component: GuestComponent, canActivate: [GuestGuard], children: guestRoutes},
  {path: '', component: AuthenticatedComponent, canActivate: [AuthGuard], children: authenticatedRoutes},
  
  {path: '**', redirectTo: ''}
]

export const routing = RouterModule.forRoot(routes);