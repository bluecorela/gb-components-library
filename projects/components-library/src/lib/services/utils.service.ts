// ##### IONIC & ANGULAR
import { Injectable, inject, signal } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';

// ##### GB COMPONENTS
import { GbGenericModalComponent } from '../components/gb-generic-modal/gb-generic-modal.component';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  constructor() {
    addIcons(icons);
  }

  // ##### SIGNALS
  activeToast = signal<HTMLIonToastElement | null>(null);

  // ##### INJECTS
  modalCtrl = inject(ModalController);
  toastCtrl = inject(ToastController);

  // ##### METHODS
  public async openModal({
    props,
    mode = 'dialog',
    comp = GbGenericModalComponent,
  }: {
    props?: object;
    mode?: 'dialog' | 'fullscreen' | 'card';
    comp?: any;
  }): Promise<string | null> {
    let id = '';
    const modalObj: any = {
      component: comp || GbGenericModalComponent,
      componentProps: props,
    };
    if (mode === 'dialog') {
      id = 'dialog-modal';
      modalObj.mode = 'ios';
    }
    if (mode === 'card') {
      id = 'card-modal';
      modalObj.initialBreakpoint = 1;
      modalObj.breakpoints = [1];
      modalObj.mode = 'ios';
    }
    modalObj.id = id;
    const modal = await this.modalCtrl.create(modalObj);
    modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) return data.action;
    return null;
  }

  public async openToast({
    text,
    type = 'default',
    header,
    icon,
    id,
    duration = 5000,
    position = 'top',
    color,
  }: {
    text: string;
    type?: 'default' | 'success' | 'warning' | 'error';
    header?: string;
    icon?: string;
    id?: string;
    duration?: number;
    position?: 'top' | 'bottom';
    color?: string;
  }): Promise<void> {
    const typeConfig: Record<string, { icon: string; color: string }> = {
      default: { icon: 'information-circle-outline', color: 'blue' },
      error: { icon: 'close-circle-outline', color: 'error' },
      success: { icon: 'checkmark-circle-outline', color: 'success' },
      warning: { icon: 'warning-outline', color: 'warning' },
    };

    const selectedType = typeConfig[type] || typeConfig['default'];
    const icn = icon || selectedType.icon;
    const col = color || selectedType.color;

    const toast = await this.toastCtrl.create({
      message: text,
      duration,
      position,
      id: `${id}-gb-toast`,
      color: `gb-${col}-25`,
      mode: 'ios',
      cssClass: [`text-gb-${col}-600`, `gb-toast-gb-${col}-500`, 'w500'],
      swipeGesture: 'vertical',
      icon: icn,
      header,
      buttons: [{ side: 'end', icon: 'close', role: 'cancel' }],
    });

    this.activeToast()?.dismiss();
    this.activeToast.update(() => toast);
    await toast.present();
  }
}
