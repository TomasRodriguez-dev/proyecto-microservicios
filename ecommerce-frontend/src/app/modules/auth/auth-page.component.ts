import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  standalone: false
})
export class AuthPageComponent {
  currentRoute: 'login' | 'register' = 'login';
  slides = [
    {
      icon: 'pi pi-sign-in',
      title: 'Accedé fácilmente',
      text: 'Ingresá con tu cuenta y continuá con tus gestiones sin complicaciones.'
    },
    {
      icon: 'pi pi-shopping-cart',
      title: 'Productos a tu alcance',
      text: 'Explorá el catálogo disponible y encontrá lo que necesitás en segundos.'
    },
    {
      icon: 'pi pi-credit-card',
      title: 'Pagos simples y seguros',
      text: 'Paga con total seguridad y confianza.'
    },
    {
      icon: 'pi pi-file',
      title: 'Tus facturas en línea',
      text: 'Consultá y descargá tus facturas siempre que lo necesites.'
    }
  ];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url.includes('register') ? 'register' : 'login';
      }
    });
  }
}
