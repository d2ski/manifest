import { Route } from '@angular/router';
import { ManifestComponent } from './manifest/manifest.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/data-access/auth.guard';
import { ManifestsListComponent } from './manifests_list/manifests-list.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app',
  },
  {
    path: 'app',
    component: ManifestsListComponent,
    title: 'Манифест продуктивности',
    canActivate: [authGuard],
  },
  {
    path: 'app/manifest/:manifestId',
    component: ManifestComponent,
    title: 'Манифест продуктивности',
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Вход в аккаунт',
  },
  { path: '**', redirectTo: '/' },
];
