import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MetaMaskAuthService {
  
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  public userAddress: string | null = null;

  private walletSignature = new BehaviorSubject<string>('');

  constructor() {
    this.initializeProvider();
  }

  // Initialize the MetaMask provider
  private initializeProvider(): void {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      this.provider = new ethers.BrowserProvider((window as any).ethereum);
    } else {
      console.error('MetaMask is not installed. Please install MetaMask to use this feature.');
    }
  }

  // Request to connect MetaMask wallet
  async connectWallet(): Promise<void> {
    if (this.provider) {
      try {
        await this.provider.send('eth_requestAccounts', []);
        this.signer = await this.provider.getSigner();
        this.userAddress = await this.signer.getAddress();
        console.log('Connected address:', this.userAddress);
      } catch (error) {
        console.error('User denied account access or error occurred:', error);
      }
    } else {
      console.error('MetaMask provider is not initialized.');
    }
  }

  // Sign a message for authentication
  async signMessage(message: string): Promise<string | null> {
    if (this.signer) {
      try {
        const signature = await this.signer.signMessage(message);
        console.log('Signature:', signature);
        return signature;
      } catch (error) {
        console.error('Error signing message:', error);
        return null;
      }
    } else {
      console.error('Signer is not available. Connect to MetaMask first.');
      return null;
    }
  }

  setSignature(signature: string) {
    this.walletSignature.next(signature);
  }
  signOut() {
    this.walletSignature.next('');
  }

  getWalletSignatureObservable() {
    return this.walletSignature.asObservable();
  }

  getWalletSignatureValue() {
    return this.walletSignature.getValue();
  }
}
