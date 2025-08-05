import { Component, ElementRef, HostListener, ViewChild, computed, inject, input, signal } from "@angular/core";

import { ContextMenuItem } from "./gb-dropdown-btn.interface";
import { GbIconComponent } from "../gb-icon/gb-icon.component";

@Component({
  selector: "gb-dropdown-btn",
  imports: [GbIconComponent],
  templateUrl: "./gb-dropdown-btn.component.html",
  styleUrl: "./gb-dropdown-btn.component.scss",
})
export class GbDropdownBtnComponent {
  @ViewChild("contextMenu") boxRef!: ElementRef;

  @HostListener("document:click", ["$event"])
  handleClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) this.isOpen.set(false);
  }

  private elementRef = inject(ElementRef);

  label = input("");
  left = input(0);
  top = input(0);
  icon = input("");
  disabled = input(false);
  menuOptions = input.required<ContextMenuItem[]>();

  isOpen = signal(false);

  toggleValue() {
    this.isOpen.update((val) => !val);
  }

  clickOption(fn: Function) {
    fn();
    this.isOpen.set(false);
  }

  classes = computed(() => {
    let classes =
      "bg-gb-no-color inline-flex items-center justify-center gap-2.5 rounded-md px-7 py-3 text-center text-base font-medium";
    if (!this.disabled())
      classes += " active:text-gb-white text-gb-blue-500 border-gb-blue-500 hover:bg-gb-blue-25 active:bg-gb-blue-500";
    else classes += " text-gb-gray-dark-600 border-gb-gray-dark-600";
    if (this.isOpen()) classes += " bg-gb-blue-25";
    return classes;
  });

  chevronDirection = computed(() => {
    if (this.isOpen()) return "chevron-up";
    return "chevron-down";
  });

  contextMenuClasses = computed(() => {
    let classes = "absolute z-40 transition-all";
    if (this.isOpen()) classes += " opacity-100 visible";
    else classes += " invisible opacity-0";
    return classes;
  });
}
