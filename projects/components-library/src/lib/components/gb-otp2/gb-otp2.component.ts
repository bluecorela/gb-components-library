// ##### IONIC & ANGULAR
import { Component, OnInit, input, output, signal, ViewChildren, QueryList, ElementRef } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "gb-otp",
  templateUrl: "./gb-otp2.component.html",
  styleUrls: ["./gb-otp2.component.scss"],
  imports: [FormsModule],
})
export class GbOtpComponent2 implements OnInit {
  @ViewChildren("otpInput") otpInputs!: QueryList<ElementRef>;

  // ##### INPUTS
  value = input.required<string>();
  length = input(6);
  hint = input("");
  errHint = input("");
  readonly = input(false);

  // OUTPUTS
  valueChange = output<string>();

  // ##### SIGNALS
  otpVals = signal<string[]>([]);

  // ##### METHODS
  focusInput(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    if (!/^[0-9]$/.test(input.value) && input.value !== "") {
      this.otpVals()[index] = "";
      input.value = "";
      return;
    }
    const nextInput = this.otpInputs.get(index + 1)?.nativeElement;
    const prevInput = this.otpInputs.get(index - 1)?.nativeElement;
    if (input.value.length === 1 && nextInput) {
      nextInput.focus();
    } else if (input.value.length === 0 && prevInput) {
      prevInput.focus();
    }
    this.valueChange.emit(this.otpVals().join(""));
  }

  handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData("text").replace(/\D/g, "") || "";
    const otpArray = pasteData.split("");
    this.otpInputs.forEach((input, index) => {
      if (otpArray[index]) {
        input.nativeElement.value = otpArray[index];
        this.otpVals()[index] = otpArray[index];
      }
    });
    this.otpInputs.last.nativeElement.focus();
    this.valueChange.emit(pasteData.substring(0, this.length()));
  }

  // ##### LC HOOKS
  ngOnInit() {
    for (let i = 0; i < this.length(); i++) {
      this.otpVals.update((val) => [...val, this.value()[i] || ""]);
    }
  }
}
