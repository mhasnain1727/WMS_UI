import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // ❌ In APIs par header nahi bhejna hai
  const skippedUrls = ['/api/Auth/GetToken', '/api/Auth/login'];
  const shouldSkip = skippedUrls.some(url => req.url.includes(url));

  if (shouldSkip) {
    return next(req);
  }

  // ✅ Session storage se decrypted token uthana
  const token = sessionStorage.getItem('access_token');

  if (token) {
    const authReq = req.clone({
      setHeaders: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return next(authReq);
  }

  return next(req);
};