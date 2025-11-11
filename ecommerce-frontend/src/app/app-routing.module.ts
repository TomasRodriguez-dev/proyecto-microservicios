import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guard/auth.guard';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: AdminLayoutComponent,      
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {
        path: 'productos',
        loadChildren: () =>
          import('./modules/productos/productos.module').then(m => m.ProductosModule)
      },
      // {
      //   path: 'facturas',
      //   loadChildren: () =>
      //     import('./modules/facturas/facturas.module').then(m => m.FacturasModule)
      // }
      {
        path: 'perfil',
        loadChildren: () =>
          import('./modules/perfil/perfil.module').then(m => m.PerfilModule)
      },
    ]
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
