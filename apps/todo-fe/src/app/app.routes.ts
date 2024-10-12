import { Route } from '@angular/router';
import { RegisterComponent } from './users/register.component';

export const appRoutes: Route[] = [
  {
    path: 'register',
    component: RegisterComponent,
  },
];
