import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetaMaskAuthService } from './meta-mask-auth.service';

@Injectable({
  providedIn: 'root',
})
export class WalletAuthInterceptorService implements HttpInterceptor {
  private webAuthToken = '';

  constructor(metaMaskAuthService: MetaMaskAuthService) {
    metaMaskAuthService
    .getWalletSignatureObservable()
    .subscribe(a => this.webAuthToken = a)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and add the WebAUTH header if the token exists
    if (this.webAuthToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.webAuthToken}`,
        },
      });
      return next.handle(authReq);
    }

    // Proceed without modifying the request if no token is found
    return next.handle(req);
  }
}
