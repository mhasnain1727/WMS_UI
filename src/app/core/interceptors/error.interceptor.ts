import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const messageService = inject(MessageService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An unexpected error occurred';

            if (error.error instanceof ErrorEvent) {
                // Client-side error
                errorMessage = `Error: ${error.error.message}`;
            } else {
                // Server-side error
                switch (error.status) {
                    case 400:
                        errorMessage = error.error?.message || 'Bad request. Please check your input.';
                        break;
                    case 401:
                        errorMessage = 'Unauthorized. Please login again.';
                        // Redirect to login if not already there
                        if (!router.url.includes('/auth/login')) {
                            router.navigate(['/auth/login']);
                        }
                        break;
                    case 403:
                        errorMessage = 'Access forbidden. You do not have permission to perform this action.';
                        break;
                    case 404:
                        errorMessage = error.error?.message || 'Resource not found.';
                        break;
                    case 500:
                        errorMessage = 'Internal server error. Please try again later.';
                        break;
                    case 503:
                        errorMessage = 'Service unavailable. Please try again later.';
                        break;
                    default:
                        errorMessage = error.error?.message || `Error: ${error.message}`;
                }
            }

            // Show error message using PrimeNG MessageService
            messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: errorMessage,
                life: 5000
            });

            return throwError(() => error);
        })
    );
};
