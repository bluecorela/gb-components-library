import * as icons from "ionicons/icons";

import {
  AlertController,
  LoadingController,
  LoadingOptions,
  ModalController,
  ToastController,
} from "@ionic/angular/standalone";
// ##### IONIC & ANGULAR
import { Injectable, inject, signal } from "@angular/core";

// ##### TYPES
import FormObject from "../types/FormObject";
// ##### GB COMPONENTS
import { GbGenericModalComponent } from "../components/gb-generic-modal/gb-generic-modal.component";
import { addIcons } from "ionicons";

@Injectable({
  providedIn: "root",
})
export class Utils {
  constructor() {
    addIcons(icons);
  }

  // ##### SIGNALS
  activeToast = signal<HTMLIonToastElement | null>(null);
  activeLoader = signal<HTMLIonLoadingElement | null>(null);

  // ##### INJECTS
  modalCtrl = inject(ModalController);
  alertCtrl = inject(AlertController);
  toastCtrl = inject(ToastController);
  ldngCtrl = inject(LoadingController);

  // ##### METHODS
  public async openModal({
    props,
    mode = "dialog",
    comp = GbGenericModalComponent,
    backdropDismiss = true,
    enterAnimation,
    leaveAnimation,
    initialBreakP = 1,
    breakP = [1],
  }: {
    props?: object;
    mode?: "dialog" | "fullscreen" | "card";
    comp?: any;
    backdropDismiss?: boolean;
    enterAnimation?: ((baseEl: HTMLElement) => any) | null;
    leaveAnimation?: ((baseEl: HTMLElement) => any) | null;
    initialBreakP?: any;
    breakP?: any;
  }): Promise<string | null> {
    let id = "";
    const modalObj: any = {
      backdropDismiss: backdropDismiss,
      component: comp || GbGenericModalComponent,
      componentProps: props,
    };
    if (mode === "dialog") {
      id = "dialog-modal";
      modalObj.mode = "ios";
    }
    if (mode === "card") {
      id = "card-modal";

      modalObj.initialBreakpoint = initialBreakP;
      modalObj.breakpoints = breakP;
      modalObj.handle = true;
      modalObj.mode = "ios";
    }

    modalObj.id = id;
    let modal = await this.modalCtrl.create(modalObj);

    if (enterAnimation != null) {
      modal.enterAnimation = enterAnimation;
    }

    if (leaveAnimation != null) {
      modal.leaveAnimation = leaveAnimation;
    }

    modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) return data.action;
    return null;
  }

  public async openAlert({
    header,
    subHeader,
    message,
    mode = "md",
    buttons,
    cssClass,
  }: {
    header?: string;
    message?: string;
    subHeader?: string;
    mode?: "ios" | "md";
    buttons?: Array<{
      text: string;
      role?: string;
      cssClass?: string | string[];
      handler?: () => void;
    }>;
    cssClass?: string;
  }): Promise<void> {
    const alertOptions = {
      mode,
      ...(cssClass && { cssClass }),
      ...(header && { header }),
      ...(subHeader && { subHeader }),
      ...(message && { message }),
      ...(buttons && { buttons }),
    };

    const alert = await this.alertCtrl.create(alertOptions);
    await alert.present();
  }

  validateForm(formData: FormObject): boolean {
    for (let field in formData) {
      const [val, min, max] = [formData[field].value(), formData[field].min, formData[field].max];
      let validator: RegExp | RegExp[] | boolean = /(?:)/;
      if (typeof formData[field].validator === "boolean") validator = formData[field].validator;
      if (formData[field].validator && typeof formData[field].validator !== "boolean")
        validator = formData[field].validator();
      const num = parseFloat(`${val}`);
      if (typeof validator === "boolean" && val !== validator) return false;
      if (typeof val === "string" || typeof val === "number")
        if (!this.validateField(val, num, validator, min, max)) return false;
    }
    return true;
  }

  validateField(
    val: string,
    num: number,
    validator?: RegExp | RegExp[] | boolean,
    min?: number,
    max?: number,
  ): boolean {
    const isRegexOrRegexArr = validator instanceof RegExp || Array.isArray(validator);
    if (isRegexOrRegexArr) {
      const vld = Array.isArray(validator) ? validator : [validator];
      if (!this.validateString(val, vld)) return false;
    }
    if (min || max) {
      if (!this.validateMinMax(min, max, num)) return false;
    }
    return true;
  }

  public validateString(val: string, validator: RegExp[]): boolean {
    for (let vldtr of validator) if (!vldtr.test(val.trim())) return false;
    return true;
  }

  public validateMinMax(min: number | undefined, max: number | undefined, num: number): boolean {
    if (isNaN(num)) return false;
    else {
      if (typeof min !== "undefined" && num < min) return false;
      if (typeof max !== "undefined" && num > max) return false;
    }
    return true;
  }

  public async openToast({
    text,
    type = "default",
    header,
    icon,
    id,
    duration = 5000,
    position = "top",
    color,
  }: {
    text: string;
    type?: "default" | "success" | "warning" | "error";
    header?: string;
    id?: string;
    icon?: string;
    duration?: number;
    position?: "top" | "bottom";
    color?: string;
  }): Promise<void> {
    const typeConfig: Record<string, { icon: string; color: string }> = {
      default: { icon: "information-circle-outline", color: "blue" },
      error: { icon: "close-circle-outline", color: "error" },
      success: { icon: "checkmark-circle-outline", color: "success" },
      warning: { icon: "warning-outline", color: "warning" },
    };

    const selectedType = typeConfig[type] || typeConfig["default"];
    const icn = icon || selectedType.icon;
    const col = color || selectedType.color;

    const toast = await this.toastCtrl.create({
      message: text,
      duration,
      position,
      id: `${id}-gb-toast`,
      color: `gb-white-500`,
      mode: "ios",
      cssClass: [`text-gb-text-primary`, `gb-toast-gb-${col}-500`, "w500"],
      swipeGesture: "vertical",
      icon: icn,
      header,
      buttons: [{ side: "end", icon: "close", role: "cancel" }],
    });

    this.activeToast()?.dismiss();
    this.activeToast.update(() => toast);
    await toast.present();
  }

  public async openLoader(opts?: LoadingOptions) {
    this.activeLoader.set(await this.ldngCtrl.create(opts));
    this.activeLoader()?.present();
  }

  public dismissLoader() {
    this.activeLoader()?.dismiss();
    this.activeLoader.set(null);
  }

  public dismissModal() {
    this.modalCtrl.dismiss();
  }

  public cleanStringForRegex(stringVal: string) {
    return stringVal.trim().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, (match) => `[${match}]`);
  }
}
