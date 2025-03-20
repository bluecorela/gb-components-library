import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  computed,
  effect,
  inject,
  input,
  output,
} from "@angular/core";
import { REGEX } from "../../constants/regex";

// ##### TYPES
export const KeyboardEventsEnum = {
  KEYDOWN: "keydown",
  INPUT: "input",
  FOCUS: "focus",
  PASTE: "paste",
  MOUSE_DOWN: "mousedown",
} as const;

type KeyboardEventsEnum = (typeof KeyboardEventsEnum)[keyof typeof KeyboardEventsEnum];

@Component({
  selector: "gb-otp",
  templateUrl: "./gb-otp.component.html",
  styleUrl: "./gb-otp.component.scss",
})
export class GbOtpComponent implements AfterViewInit {

  @ViewChildren("otpInput") otpInputs!: QueryList<ElementRef>;

  // #####INPUTS
  readValue = input<string>("");
  label = input<string>("");
  errorToken = input<boolean>(false);
  errorHint = input("");

  // ##### OUTPUTS
  valueChange = output<string>();

  // ### COMPUTED
  inputClasses = computed(() => {
    const baseClass: string =
      "w-full shadow-xs items-center justify-center rounded-lg border border-stroke bg-white p-2 text-center text-2xl font-medium text-gb-gray-dark-900 outline-none sm:text-4xl";
    let finalClass: string = baseClass;

    if (this.errorToken()) {
      finalClass = finalClass.replace("border-stroke", "border-gb-error-500");
    }

    return finalClass;
  });

  constructor() {
    //EFFECT atento a los cambios del signal readValue()
    effect(() => {
      this.readValue();
      this.setInputValues();
    });
  }

  ngAfterViewInit(): void {
    this.setInputValues();
    this.otpInputs.forEach((input) => {
      input.nativeElement.addEventListener(KeyboardEventsEnum.KEYDOWN, (event: KeyboardEvent) =>
        this.handleKeyDown(event),
      );
      input.nativeElement.addEventListener(KeyboardEventsEnum.INPUT, (event: Event) => this.handleInput(event));
      input.nativeElement.addEventListener(KeyboardEventsEnum.FOCUS, (event: Event) => this.handleFocus(event));
      input.nativeElement.addEventListener(KeyboardEventsEnum.PASTE, (event: ClipboardEvent) =>
        this.handlePaste(event),
      );
      input.nativeElement.addEventListener(KeyboardEventsEnum.MOUSE_DOWN, (event: MouseEvent) => {
        if (event.button === 0 && input.nativeElement.value !== "") {
          input.nativeElement.focus();
          event.preventDefault();
        }
      });
    });
  }

  private setInputValues(): void {
    if (!this.otpInputs) {
      return;
    }

    if (this.readValue() === "") {
      return;
    }

    const inputsArray = this.otpInputs.toArray().map((el) => el.nativeElement);
    const otpArray = this.readValue().split("");

    inputsArray.forEach((input, index) => {
      input.value = otpArray[index] || "";
      input.disabled = true;
    });

    this.emitOtpValue();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    const inputsArray = this.otpInputs.toArray().map((el) => el.nativeElement);
    const index = inputsArray.indexOf(target);

    if (!REGEX.ONLY_ONE_NUMBER.test(event.key) && !["Backspace", "Delete", "Tab"].includes(event.key)) {
      event.preventDefault();
    }

    if (event.key === "Backspace" || event.key === "Delete") {
      if (target.value) {
        target.value = "";
      } else if (index > 0) {
        inputsArray[index - 1].value = "";
        inputsArray[index - 1].focus();
      }
      this.emitOtpValue();
    }
  }

  private handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const inputsArray = this.otpInputs.toArray().map((el) => el.nativeElement);
    const index = inputsArray.indexOf(target);

    if (target.value && index < inputsArray.length - 1) {
      inputsArray[index + 1].focus();
    }

    this.emitOtpValue();
  }

  private handleFocus(event: Event): void {
    (event.target as HTMLInputElement).select();
  }

  private handlePaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text = event.clipboardData?.getData("text") || "";
    const inputsArray = this.otpInputs.toArray().map((el) => el.nativeElement);

    if (!new RegExp(`^[0-9]{${inputsArray.length}}$`).test(text)) return;

    text.split("").forEach((digit, index) => {
      if (inputsArray[index]) {
        inputsArray[index].value = digit;
        this.emitOtpValue();
      }
    });
  }

  private emitOtpValue(): void {
    this.valueChange.emit(this.obtainOtpValue());
  }

  private obtainOtpValue(): string {
    return this.otpInputs
      .toArray()
      .map((el) => el.nativeElement.value)
      .join("");
  }
}
