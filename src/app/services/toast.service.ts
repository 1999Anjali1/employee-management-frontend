import { Injectable, signal } from '@angular/core';
import { NgZone } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast = signal<Toast | null>(null);

  constructor(private zone: NgZone) {}

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.zone.run(() => {
      this.toast.set({ message, type });
      setTimeout(() => this.toast.set(null), 3000);
    });
  }
}