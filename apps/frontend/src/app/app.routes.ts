import { Route } from '@angular/router';
import { RegisterComponent } from './users/register.component';
import { LoginComponent } from './users/login.component';

export const appRoutes: Route[] = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
