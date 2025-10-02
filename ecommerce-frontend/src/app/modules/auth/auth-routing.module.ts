import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NoAuthGuard } from '../../core/auth/guard/noAuth.guard';

const routes: Routes = [
    { 
        path: '',
        component: AuthPageComponent,
        children: [
            { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
            { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AuthRoutingModule {}
