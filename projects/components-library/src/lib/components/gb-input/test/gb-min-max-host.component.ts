import { Component } from "@angular/core";
import { GbInputComponent } from "../gb-input.component";

@Component({
  selector: "gb-min-max-host",
  standalone: true,
  template: `<gb-input
    [type]="type"
    [value]="value"
    [color]="color"
    [level]="level"
    [icon]="icon"
    [disabled]="disabled"
    [passwordToggle]="passwordToggle"
    [regex]="regex"
    [required]="required"
    [min]="min"
    [max]="max">
  </gb-input>`,
  imports: [GbInputComponent],
})
export class GbMinMaxHostComponent {
  type: "text" | "password" | "email" | "number" = "number";
  value: string | number = "";
  color: string = "blue";
  level: number = 500;
  icon?: string = "battery-charging-outline";
  disabled: boolean = false;
  passwordToggle: boolean = false;
  min?: number;
  max?: number;
}
