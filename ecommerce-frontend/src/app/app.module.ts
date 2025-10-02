import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { providePrimeNG } from 'primeng/config';
import { AppRoutingModule } from './app-routing.module';
import { App } from './app';
import { ThemeService } from './core/theme/theme.service';
import MyPreset from './core/theme/mypreset';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/auth/interceptor/auth.interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    providePrimeNG({
      theme: {
        preset: MyPreset, 
        options: {
          darkModeSelector: 'html.dark',
        }
      },
      translation: {
        weak: 'Débil',
        medium: 'Media',
        strong: 'Fuerte',
        passwordPrompt: 'Ingrese una contraseña',
        accept: 'Aceptar',
        reject: 'Rechazar',
      }
    }),
    ThemeService
  ],
  bootstrap: [App]
})
export class AppModule {}
