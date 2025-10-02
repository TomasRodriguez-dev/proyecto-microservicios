import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/service/auth.service';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    standalone: false
})
export class DashboardPageComponent {
    constructor(private authService: AuthService, private router: Router) {}

    logout() {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }
}
