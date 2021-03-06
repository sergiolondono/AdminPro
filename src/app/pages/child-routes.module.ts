import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { RouterModule } from '@angular/router';

const childRoutes = [
  { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard', description: 'Módulo de reportes' } },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress', description: 'Módulo progress' } },
  { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas', description: 'Módulo de gráficas' } },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas', description: 'Módulo de promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'ReactiveX JS', description: 'Módulo de ReactiveX JS' } },
  { path: 'account-settings', component: AccountSettingsComponent,
    data: { titulo: 'Ajustes del tema', description: 'Módulo de ajustes del tema' } },
  { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },

  // Mantenimientos
  { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' } },
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales' } },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
