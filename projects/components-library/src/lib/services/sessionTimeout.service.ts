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
    toastMessage,
  }: {
    modalComp?: any;
    timeoutRedirectRoute: string;
    exceptionRoutes: string[];
    sessionTimer?: number;
    modalTimer?: number;
    toastMessage?: string;
  }) {
    const totalSessionTime = sessionTimer ?? this.defaultSessionTimer;
    const showModalAt = modalTimer ?? this.defaultModalTimer;

    this.setSessionTimer(totalSessionTime);

    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isInModal = target.closest("ion-modal") !== null;
      if (!isInModal) this.setSessionTimer(totalSessionTime);
    });

    this.sessionInterval = setInterval(() => {
      const currentRoute = this.router.url;

      if (!exceptionRoutes.includes(currentRoute)) {
        this.sessionTimer.update((val) => val - 1);
        const remaining = this.sessionTimer();

        if (remaining === showModalAt && modalComp) {
          this.showSessionTimeoutModal(modalComp);
        }

        if (remaining === 0) {
          if (!modalComp && toastMessage) {
            this.utils.openToast({
              text: toastMessage,
              type: "default",
              id: "session-toast",
            });
          }

          this.endSessionTimeout(timeoutRedirectRoute);
        }
      }
    }, 1000);
  }

  public setSessionTimer(timer?: number) {
    this.sessionTimer.set(timer || this.defaultSessionTimer);
  }

  public endSessionTimeout(redirectRoute: string) {
    this.utils.dismissModal();
    clearInterval(this.sessionInterval!);
    this.router.navigate([redirectRoute]);
  }

  private showSessionTimeoutModal(modalComp: any) {
    this.utils.openModal({ comp: modalComp });
  }
}
