import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { TablaDinamicaService } from '../service/tabla-dinamica.service';
import { IAccionTabla } from '../model/accion.interface';

@Component({
  selector: 'app-tabla-dinamica',
  templateUrl: './tabla-dinamica.component.html',
  styleUrls: ['./tabla-dinamica.component.scss'],
  standalone: false
})
export class TablaDinamicaComponent implements OnInit {
  @Input() endpoint: string = '';
  @Input() columns: string[] = [];
  @Input() headers: string[] = [];
  @Input() filters: Record<string, any> = {};
  @Input() formatters: Record<string, (value: any) => any> = {};
  @Input() title = '';
  @Input() actionLabel = '';
  @Input() actionIcon = 'pi pi-plus';
  @Input() actions: IAccionTabla[] = [];
  @Output() actionClick = new EventEmitter<void>();

  data: any[] = [];
  loading = false;
  totalRecords = 0;

  menuItems: MenuItem[] = [];

  // Popover dinámico
  @ViewChild('dynamicPopover') dynamicPopover: any;
  currentPopoverTemplate?: TemplateRef<any>;
  currentRow: any;
  popoverTarget?: HTMLElement;

  constructor(private _tablaDinamicaService: TablaDinamicaService) {}

  ngOnInit() {
    this.loadData({ first: 0, rows: 10 } as TableLazyLoadEvent);
  }

  loadData(event: TableLazyLoadEvent | any): void {
    this.loading = true;
    const rows = event?.rows ?? 10;
    const first = event?.first ?? 0;
    const page = first / rows + 1;
    const limit = rows;
    const query = `${this.endpoint}?page=${page}&limit=${limit}${this.query(this.filters)}`;

    this._tablaDinamicaService.getData(query, '').subscribe({
      next: (res) => {
        const raw = res.data?.result ?? res.data ?? [];
        this.data = raw.map((r: any) => ({
          __raw: r, 
          ...Object.fromEntries(
            Object.entries(r).map(([k, v]) => [
              k,
              v == null ? '-' : this.formatters[k]?.(v) ?? v,
            ])
          )
        }));
        this.totalRecords = +res.totalCount || raw.length || 0;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  private query(f: Record<string, any>): string {
    return Object.entries(f)
      .filter(([_, v]) => v != null && v !== '')
      .map(([k, v]) => `&${k}=${v}`)
      .join('');
  }

  onActionClick() {
    this.actionClick.emit();
  }

  openMenu(event: Event, row: any, menu: any) {
    const anchorEl = event.currentTarget as HTMLElement;

    this.menuItems = this.actions
      .filter(a => !a.mostrarSi || a.mostrarSi(row))
      .map(a => ({
        label: a.label,
        icon: a.icon,
        disabled: a.deshabilitarSi?.(row),
        command: () => {
          if (a.usarPopover && a.popoverTemplate) {
            this.currentPopoverTemplate = a.popoverTemplate;
            this.currentRow = row.__raw ?? row;
            this.popoverTarget = anchorEl;
            this.dynamicPopover.show(null, this.popoverTarget);
            a.action?.(row.__raw ?? row, event, menu);
          } else {
            a.action?.(row, event, menu);
            if (!a.mantenerMenu) menu.hide();
          }
        },
        styleClass: a.color ? this.getColorClass(a.color) : ''
      }));

    menu.toggle(event);
  }

  closePopover() {
    if (this.dynamicPopover) {
      this.dynamicPopover.hide();
      this.currentRow = null;
      this.currentPopoverTemplate = undefined;
      this.popoverTarget = undefined;
    }
  }

  private getColorClass(color: string): string {
    if (color.startsWith('bg-') || color.startsWith('text-')) {
      return color;
    }
    return '';
  }
}
