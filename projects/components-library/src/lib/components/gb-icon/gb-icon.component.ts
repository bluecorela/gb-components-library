// ##### IONIC & ANGULAR
import { Component, input, signal, OnInit, computed } from "@angular/core";
import { IonIcon } from "@ionic/angular/standalone";
import * as icons from "ionicons/icons";
import { addIcons } from "ionicons";
@Component({
  selector: "gb-icon",
  templateUrl: "./gb-icon.component.html",
  styleUrls: ["./gb-icon.component.scss"],
  imports: [IonIcon],
})
export class GbIconComponent implements OnInit {
  // ##### INPUTS
  icon = input.required<string>();
  color = input<string>();
  size = input<string>();
  extraClass = input<string>();
  from = input<"font" | "file" | "src" | "ionic">("font");

  // ##### SIGNALS
  iconLoaded = signal(false);

  // ##### COMPUTED
  iconPath = computed(() => `assets/icon/${this.icon()}.svg`);
  fontIconClass = computed(
    () => `icon icon-${this.icon()} text-${this.color()} ${this.extraClass() ? this.extraClass() : ``}`,
  );

  // ##### LC HOOKS
  async ngOnInit(): Promise<void> {
    if (this.from() == "ionic") addIcons(icons);
    if (this.from() == "file") {
      const response = await fetch(this.iconPath());
      const svgContent = await response.text();
      const key = this.icon();
      const iconsObj: { [key: string]: any } = {};
      iconsObj[key] =
        `data:image/svg+xml;utf8,${svgContent.replace(/fill="#[0-9a-fA-F]{3,6}"/g, 'fill="currentColor"')}`;
      addIcons(iconsObj);
      this.iconLoaded.update(() => true);
    }
  }
}
