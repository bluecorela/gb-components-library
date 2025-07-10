import { Component, input, output } from "@angular/core";
import { IonCol, IonRow } from "@ionic/angular/standalone";

import { SegmentTab } from "./gb-segment.interface";

@Component({
  selector: "gb-segment",
  templateUrl: "./gb-segment.component.html",
  styleUrl: "./gb-segment.component.scss",
  imports: [IonCol, IonRow],
})
export class GbSegmentComponent {
  tabs = input.required<SegmentTab[]>();
  active = input.required<string>();

  tabChange = output<string>();

  updateTab(id: string): void {
    this.tabChange.emit(id);
  }

  tabsClasses = (id: string) => {
    let def = "font-red-hat-500 select-none cursor-pointer text-lg gb-py-2xl gb-px-3xl border-b-2 ";
    if (id === this.active()) return def + "active-segment-border-bottom border-b-2 bg-gb-blue-25 text-gb-blue-500";
    else return def + "segment-border-bottom hover:bg-gb-blue-25 text-gb-text-primary";
  };
}
