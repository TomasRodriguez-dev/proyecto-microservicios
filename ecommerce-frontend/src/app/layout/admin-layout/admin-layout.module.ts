import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

// Componentes
import { AdminLayoutComponent } from './admin-layout.component';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    PanelMenuModule,
    MenubarModule,
    ButtonModule,
    TooltipModule,
    MenuModule,
    TieredMenuModule,
    AvatarModule
  ],
  exports: [AdminLayoutComponent]
})
export class AdminLayoutModule {}
