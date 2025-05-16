import { Component, input, output } from "@angular/core";
import { IonCol, IonRow, IonSpinner } from "@ionic/angular/standalone";
import { GbIconComponent } from "../gb-icon/gb-icon.component";
import { GbBtnComponent } from "../gb-btn/gb-btn.component";

@Component({
  selector: "gb-error-content",
  templateUrl: "./gb-error-content.component.html",
  styleUrl: "./gb-error-content.component.scss",
  imports: [IonCol, IonRow, IonSpinner, GbIconComponent, GbBtnComponent],
})
export class GbErrorContentComponent {

  shouldShowErrorLoading = input<boolean>(false);
  messageError = input<string>("");
  btnLabel = input<string>("");
  clicked = output<boolean>();

  public showRefreshBtn: boolean = true;
  private counterClick: number = 0;

  onClick(): void {
    this.counterClick++;
    this.showRefreshBtn = this.counterClick !== 3;
    const clickEvent: boolean = !this.showRefreshBtn;
    this.clicked.emit(clickEvent);
  }
}
