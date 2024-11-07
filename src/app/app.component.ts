import { Component } from '@angular/core';
import { MetaMaskAuthService } from './service/meta-mask-auth.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PTN Trading';
  userAddress: string | null = null;
  isLoggedIn = false;

  constructor(private metaMaskAuthService: MetaMaskAuthService, 
    private httpClient: HttpClient,
    private dialog: MatDialog) {
      this.metaMaskAuthService
      .getWalletSignatureObservable()
      .subscribe(a=> {
        this.isLoggedIn = a ? true: false; 
      })
    }
  
  async connectWallet() {
    await this.metaMaskAuthService.connectWallet();
    this.userAddress = this.metaMaskAuthService.userAddress;
  }

  async signMessage() {
    try {
      const signature = await this.metaMaskAuthService.signMessage('Authentication Message');
      console.log('Signed Message:', signature);
      await firstValueFrom(this.httpClient.post('api/verify-signature', {signature} ));
    } catch (e: any) {
      console.error('Connect to MetaMask first.', e);
      this.dialog.open(ErrorDialogComponent, {
        data: {
          message: 'Authentication error\n' + JSON.stringify(e)
        }
      });
    }
  }
}
