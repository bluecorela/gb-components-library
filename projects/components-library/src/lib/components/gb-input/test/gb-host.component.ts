import { Component } from "@angular/core";
import { GbInputComponent } from "../gb-input.component";

@Component({
  selector: "gb-host",
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
    [required]="required">
  </gb-input>`,
  imports: [GbInputComponent],
})
export class GbHostComponent {
  type: "text" | "password" | "email" | "number" = "text";
  value: string | number = "";
  color: string = "blue";
  level: number = 500;
  icon?: string = "battery-charging-outline";
  disabled: boolean = false;
  passwordToggle: boolean = false;
  regex: string = `^[A-Za-z0-9]{6,}$`;
  required: boolean = true;
}
