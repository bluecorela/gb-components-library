import { Component } from "@angular/core";
import { GbInputComponent } from "../gb-input.component";

@Component({
  selector: "gb-host-password",
  standalone: true,
  template: `<gb-input
    [type]="type"
    [value]="value"
    [color]="color"
    [level]="level"
    [icon]="icon"
    [disabled]="disabled"
    [passwordToggle]="passwordToggle">
  </gb-input>`,
  imports: [GbInputComponent],
})
export class GbHostPasswordComponent {
  type: "text" | "password" | "email" | "number" = "password";
  value: string | number = "";
  color: string = "blue";
  level: number = 500;
  icon?: string;
  disabled: boolean = false;
  passwordToggle: boolean = true;
}
