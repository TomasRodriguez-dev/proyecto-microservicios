import { TemplateRef } from "@angular/core";

export interface IAccionTabla {
    label: string;                                        // Texto visible
    icon: string;                                         // Icono PrimeNG o material
    color?: string;
    tooltip?: string;                                     // Tooltip
    action: (row: any, event?: Event, menu?: any) => void; // Función a ejecutar
    mostrarSi?: (row: any) => boolean;                    // Mostrar o no
    deshabilitarSi?: (row: any) => boolean;               // Deshabilitar condicional
    mantenerMenu?: boolean;
    usarPopover?: boolean;                 // si es popover
    popoverTemplate?: TemplateRef<any>;
}