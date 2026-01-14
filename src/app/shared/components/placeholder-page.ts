import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-placeholder-page',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    template: `
        <div class="card">
            <div class="flex flex-col items-center justify-center py-12">
                <i [class]="'pi ' + icon + ' text-6xl text-primary mb-4'"></i>
                <h2 class="text-2xl font-semibold mb-2">{{ title }}</h2>
                <p class="text-muted-color text-center mb-6 max-w-md">{{ description }}</p>
                <div class="flex gap-2">
                    <button pButton label="Go to Dashboard" icon="pi pi-home" routerLink="/dashboard" class="p-button-outlined"></button>
                </div>
            </div>
        </div>
    `
})
export class PlaceholderPage {
    @Input() title = 'Coming Soon';
    @Input() description = 'This feature is under development and will be available soon.';
    @Input() icon = 'pi-wrench';
}
