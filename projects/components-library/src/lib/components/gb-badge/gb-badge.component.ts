import { Component, computed, input } from "@angular/core";

import { GbIconComponent } from "../gb-icon/gb-icon.component";

@Component({
  selector: "gb-badge",
  templateUrl: "./gb-badge.component.html",
  styleUrl: "./gb-badge.component.scss",
  imports: [GbIconComponent],
})
export class GbBadgeComponent {
  text = input<string>("Placeholder");
  styleBadge = input<"solid" | "outline">("solid");
  type = input<"button" | "label">("button");

  iconPosition = input<"left" | "right">("left");
  icon = input<string>();

  bgColorInput = input<string>("bg-gb-cyan-200");
  textColorInput = input<string>("text-gb-cyan-600");

  textColor = computed(() => this.textColorInput());
  borderColor = computed(() =>
    this.styleBadge() === "outline" ? this.textColorInput().replace("text-", "border-") : "",
  );
  borderClass = computed(() => (this.styleBadge() === "outline" ? `border ${this.borderColor()}` : "border-0"));
  borderRadius = computed(() => (this.type() === "button" ? "gb-rounded-border-10xl" : "gb-rounded-border-6xl"));
  badgeSpacing = computed(() => (this.type() === "button" ? "px-3 py-2" : "px-2.5 py-1"));
  textSizeWeight = computed(() => (this.type() === "button" ? `text-md font-red-hat-500` : "text-sm font-red-hat-600"));
  class = computed(
    () =>
      `inline-flex items-center ${this.badgeSpacing()} ${this.borderRadius()} ${this.textSizeWeight()} ${this.bgColorInput()} ${this.textColor()} ${this.borderClass()}`,
  );
}
