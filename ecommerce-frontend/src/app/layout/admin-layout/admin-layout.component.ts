import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../core/auth/service/auth.service';
import { IUsuario } from '../../modules/usuarios/model/usuario.model';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  standalone: false
})
export class AdminLayoutComponent implements OnInit {
  menuItems: MenuItem[] = [];
  userMenuItems: MenuItem[] = [];
  collapsed = false;
  user: IUsuario | null = null;
  userInitials = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getUser();

    if (this.user?.firstName && this.user?.lastName) {
      this.userInitials =
        (this.user.firstName[0] || '').toUpperCase() +
        (this.user.lastName[0] || '').toUpperCase();
    }

    // Menú lateral con roles permitidos
    const allMenuItems: (MenuItem & { roles?: string[] })[] = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/dashboard' },
      { label: 'Usuarios', icon: 'pi pi-users', routerLink: '/usuarios', roles: ['ADMIN'] },
      { label: 'Productos', icon: 'pi pi-shopping-cart', routerLink: '/productos' },
      { label: 'Facturas', icon: 'pi pi-file', routerLink: '/facturas' }
    ];

    const userRoles = this.user?.roles || [];

    this.menuItems = allMenuItems.filter(item =>
      !item.roles || item.roles.some(role => userRoles.includes(role))
    );

    // Menú usuario (perfil y logout)
    this.userMenuItems = [
      { label: 'Mi Perfil', icon: 'pi pi-id-card', routerLink: '/perfil' },
      { separator: true },
      { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
    ];
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.authService.logout();
    window.location.href = '/auth/login';
  }
}