import { Component, OnInit, signal } from '@angular/core';
import { ThemeService } from './core/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('ecommerce-frontend');

  constructor(private theme: ThemeService) {}

  ngOnInit(): void {
    this.theme.initTheme();
  }  
}
