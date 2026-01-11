import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [],
    template: `
        <div class="card">
            <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
            <p class="text-muted-color">Welcome to Warehouse Management System</p>
            <p class="mt-4">This is the main dashboard. You can add your widgets and components here.</p>
        </div>
    `
})
export class Dashboard {}
