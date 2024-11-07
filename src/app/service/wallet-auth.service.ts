import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MetaMaskAuthService } from './meta-mask-auth.service';

@Injectable({
  providedIn: 'root',
})
export class WalletAuthInterceptorService implements HttpInterceptor {

  constructor(private metaMaskAuthService: MetaMaskAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and add the WebAUTH header if the token exists
    const authReq = req.clone({
      setHeaders: {
        Authorization: `${this.metaMaskAuthService.getWalletSignatureValue()}`,
      },
    });

    // Proceed without modifying the request if no token is found
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Alert on HTTP error response
        if (error instanceof HttpErrorResponse) {
          alert(`HTTP Error: ${error.status} - ${error.message}`);
        }
        return throwError(error);
      })
    );
  }
}
