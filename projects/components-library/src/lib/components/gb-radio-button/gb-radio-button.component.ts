import { Component, computed, input, output } from "@angular/core";

export interface RadioButtonItems {
  id: string;
  label: string;
  nameRadioGroup: string;
}

@Component({
  selector: "gb-radio-button",
  imports: [],
  templateUrl: "./gb-radio-button.component.html",
  styleUrl: "./gb-radio-button.component.scss",
})
export class GbRadioButtonComponent {
  public title = input<string>();
  public horizontal = input<boolean>(true);
  public valueChange = output<string>();
  public buttonsList = input<RadioButtonItems[]>();

  directionclasses = computed(() => (this.horizontal() ? "flex flex-wrap" : "flex flex-col"));

  public onSelectionChange(value: string) {
    this.valueChange.emit(value);
  }
}
