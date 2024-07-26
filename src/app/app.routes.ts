import { Route } from '@angular/router';
import { ManifestComponent } from './manifest/manifest.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/data-access/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: ManifestComponent,
    title: 'Манифест продуктивности',
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Вход в аккаунт',
  },
];
