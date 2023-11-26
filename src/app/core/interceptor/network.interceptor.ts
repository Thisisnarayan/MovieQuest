import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
        return next.handle(request);
      }

      const cachedResponse = this.cache.get(request.urlWithParams);
      if (cachedResponse) {
        return of(cachedResponse);
      }
    const modifiedRequest = request.clone({
    
    });

    return next.handle(modifiedRequest)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // Handle successful responses here
            this.cache.set(request.urlWithParams, event);
            console.log('Interceptor: Response received:', event);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          // Handle errors or failed requests here
          console.error('Interceptor: Error occurred:', error);
          return throwError(error);
        })
      );
  }
}
