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
  menuOptions = input.required<ContextMenuItem[]>();

  isOpen = signal(false);

  toggleValue() {
    this.isOpen.update((val) => !val);
  }

  clickOption(fn: Function) {
    fn();
    this.isOpen.set(false);
  }

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
