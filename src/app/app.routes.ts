import { Route } from '@angular/router';
import { ManifestComponent } from './manifest/manifest.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: ManifestComponent,
    title: 'Манифест продуктивности',
  },
];
