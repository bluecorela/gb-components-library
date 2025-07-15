import { Component, ElementRef, HostListener, ViewChild, computed, inject, input, output } from "@angular/core";

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
    if (!this.elementRef.nativeElement.contains(event.target)) this.valueChange.emit(false);
  }

  private elementRef = inject(ElementRef);

  value = input.required<boolean>();
  label = input("");
  left = input(0);
  top = input(0);
  icon = input("");
  menuOptions = input<ContextMenuItem[]>();

  valueChange = output<boolean>();

  toggleValue() {
    this.valueChange.emit(!this.value());
  }

  chevronDirection = computed(() => {
    if (this.value()) return "chevron-up";
    return "chevron-down";
  });

  clickOption(fn: Function) {
    fn();
    this.valueChange.emit(false);
  }

  contextMenuClasses = computed(() => {
    let classes = "absolute z-40 transition-all";
    if (this.value()) classes += " opacity-100 visible";
    else classes += " invisible opacity-0";
    return classes;
  });
}
