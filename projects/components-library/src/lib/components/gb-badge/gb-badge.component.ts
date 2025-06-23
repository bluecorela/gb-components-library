import { Component, computed, input } from '@angular/core';

@Component({
  selector: "gb-badge",
  imports: [],
  templateUrl: "./gb-badge.component.html",
  styleUrl: "./gb-badge.component.scss",
})
export class GbBadgeComponent {
  badgeText = input<string>("Placeholder");
  badgeType = input<"solid" | "outline">("solid");

  bgColor = input<string>("bg-gb-cyan-200");
  textColor = input<string>("text-gb-cyan-600");
  textSizeWeight = input<string>("text-sm font-red-hat-600");
  borderColor = input<string>("border-gb-cyan-600");
  borderRadius = input<string>("rounded-[30px]");
  badgeSpacing = input<string>("gb-pl-lg gb-pr-lg gb-pt-xs gb-pb-xs");

  borderClass = computed(() => (this.badgeType() === "outline" ? `border ${this.borderColor()}` : "border-0"));
  class = computed(
    () =>
      `inline-flex items-center ${this.badgeSpacing()} ${this.borderRadius()} ${this.textSizeWeight()} ${this.bgColor()} ${this.textColor()} ${this.borderClass()}`,
  );
}
