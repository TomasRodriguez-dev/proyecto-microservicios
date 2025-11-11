import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaDinamicaComponent } from './components/tabla-dinamica.component';

const routes: Routes = [
    { 
        path: '',
        component: TablaDinamicaComponent
    },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class TablaDinamicaRoutingModule {}
