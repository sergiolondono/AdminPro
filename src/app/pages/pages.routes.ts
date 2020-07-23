import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { LoginGuardGuard } from '../services/service.index';
import { ChildRoutesModule } from './child-routes.module';

const pagesRoutes: Routes = [
    {
      path: '',
      component: PagesComponent,
      canActivate : [LoginGuardGuard],
      loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
  },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
