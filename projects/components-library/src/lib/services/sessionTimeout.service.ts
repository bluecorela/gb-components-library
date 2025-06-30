import { Injectable, inject, signal } from "@angular/core";

import { Router } from "@angular/router";
import { Utils } from "./utils.service";

@Injectable({
  providedIn: "root",
})
export class SessionTimeoutService {
  private utils = inject(Utils);
  private router = inject(Router);

  private defaultSessionTimer = 300;
  private defaultModalTimer = 60;
  private sessionTimer = signal(0);
  private sessionInterval: any | null = null;

  public startSessionTimeout({
    modalComp,
    timeoutRedirectRoute,
    exceptionRoutes,
    sessionTimer,
    modalTimer,
  }: {
    modalComp: any;
    timeoutRedirectRoute: string;
    exceptionRoutes: string[];
    sessionTimer?: number;
    modalTimer?: number;
  }) {
    this.setSessionTimer(sessionTimer || this.defaultSessionTimer);
    const showModalAt = modalTimer || this.defaultModalTimer;
    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isInModal = target.closest("ion-modal") !== null;
      if (!isInModal) this.setSessionTimer(sessionTimer || this.defaultSessionTimer);
    });
    this.sessionInterval = setInterval(() => {
      const currentRoute = this.router.url;
      if (!exceptionRoutes.includes(currentRoute)) {
        this.sessionTimer.update((val) => val - 1);
        if (this.sessionTimer() === showModalAt) this.showSessionTimeoutModal(modalComp);
        if (this.sessionTimer() === 0) this.endSessionTimeout(timeoutRedirectRoute);
      }
    }, 1000);
  }

  public setSessionTimer(timer?: number) {
    this.sessionTimer.set(timer || this.defaultSessionTimer);
  }

  public endSessionTimeout(redirectRoute: string) {
    clearInterval(this.sessionInterval!);
    this.router.navigate([redirectRoute]);
  }

  private showSessionTimeoutModal(modalComp: any) {
    this.utils.openModal({ comp: modalComp });
  }
}
