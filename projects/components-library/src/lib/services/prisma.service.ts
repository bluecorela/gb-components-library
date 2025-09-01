import { Injectable } from "@angular/core";
import { PrismaPlaceholder } from "../types/PrismaPlaceholder";

declare var prisma: any;

@Injectable({
  providedIn: "root",
})
export class PrismaService {
  private scriptLoaded = false;

  private loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.scriptLoaded) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://comunicaciones.globalbank.com.pa/sdk/javascript/prisma.js";
      script.async = true;
      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };
      script.onerror = (err) => reject(err);

      document.body.appendChild(script);
    });
  }

  async initPrisma(placeHolders: PrismaPlaceholder[], customerId: string) {
    try {
      await this.loadScript();

      prisma.load(
        "comunicaciones.globalbank.com.pa",
        "443",
        "8cac10ac-c13a-47fd-810e-b865ee002ef6",
        customerId,
        placeHolders,
        "https:",
        {
          onLoaded: () => console.warn("Prisma loaded"),
          onLoadFailed: (err: any) => console.error("Prisma load failed", err),
          onPopup: () => {
            const backdrop = document.getElementById("prisma_popup_backdrop");
            if (backdrop) backdrop.classList.remove("hidden");
            document.addEventListener("click", function (event) {
              const target = event.target as HTMLElement;
              if (target.classList.contains("close") && backdrop) backdrop.classList.add("hidden");
            });
          },
        },
      );
    } catch (err) {
      console.error("Error loading Prisma script", err);
    }
  }
}
