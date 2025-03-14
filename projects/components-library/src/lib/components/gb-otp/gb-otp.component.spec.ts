import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { GbOtpComponent } from "./gb-otp.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "gb-host",
  standalone: true,
  template: `<gb-otp [readValue]="readValue" [errorToken]="errorToken" (valueChange)="onValueChange($event)">
  </gb-otp>`,
  imports: [GbOtpComponent],
})
export class GbHostComponent {
  readValue: string = "";
  errorToken: boolean = false;
  emittedValue: string = "";

  onValueChange(value: string) {
    this.emittedValue = value;
  }
}

fdescribe("GbOtpComponent", () => {
  let hostComponent: GbHostComponent;
  let fixture: ComponentFixture<GbHostComponent>;
  let otpInputs: NodeListOf<HTMLInputElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbHostComponent, FormsModule, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(GbHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    otpInputs = fixture.nativeElement.querySelectorAll("input");
  });

  it("should create the GbOtpComponent", () => {
    expect(hostComponent).toBeTruthy();
  });

  it("should generate 6 input fields", () => {
    expect(otpInputs.length).toBe(6);
  });

  it("should set input values from readValue", () => {
    hostComponent.readValue = "123456";
    fixture.detectChanges();

    otpInputs.forEach((input, index) => {
      expect(input.value).toBe(hostComponent.readValue[index]);
    });
  });

  it("should handle undefined values in setInputValues", () => {
    hostComponent.readValue = "12";
    fixture.detectChanges();

    otpInputs.forEach((input, index) => {
      if (index >= 2) {
        expect(input.value).toBe("", "Remaining inputs should be empty");
      }
    });
  });

  it("should apply error border class when errorToken is true", () => {
    hostComponent.errorToken = true;
    fixture.detectChanges();

    otpInputs.forEach((input) => {
      expect(input.classList).toContain("border-gb-error-500");
    });
  });

  it("should prevent non-numeric input", () => {
    const event = new KeyboardEvent("keydown", { key: "a" });
    otpInputs[0].dispatchEvent(event);
    fixture.detectChanges();

    expect(otpInputs[0].value).toBe("", "Input should not accept non-numeric characters");
  });

  it("should delete value on Backspace", (done) => {
    hostComponent.readValue = "123456";
    fixture.detectChanges();

    otpInputs[5].dispatchEvent(new KeyboardEvent("keydown", { key: "Backspace" }));
    fixture.detectChanges();

    setTimeout(() => {
      expect(otpInputs[5].value).toBe("");
      done();
    });
  });

  it("should move focus to previous input on Backspace when empty", (done) => {
    otpInputs[5].value = "";
    fixture.detectChanges();

    spyOn(otpInputs[4], "focus").and.callThrough();
    otpInputs[5].dispatchEvent(new KeyboardEvent("keydown", { key: "Backspace" }));
    fixture.detectChanges();

    setTimeout(() => {
      expect(otpInputs[4].focus).toHaveBeenCalled();
      done();
    });
  });

  it("should paste values correctly", (done) => {
    const pasteEvent = new ClipboardEvent("paste", {
      clipboardData: new DataTransfer(),
    });
    pasteEvent.clipboardData?.setData("text", "654321");

    otpInputs[0].dispatchEvent(pasteEvent);
    fixture.detectChanges();

    setTimeout(() => {
      expect(hostComponent.emittedValue).toBe("654321");
      done();
    });
  });

  it("should not update inputs when pasted text is empty", (done) => {
    const emitSpy = spyOn(hostComponent, "onValueChange").and.callThrough();

    const pasteEvent = new ClipboardEvent("paste", {
      clipboardData: new DataTransfer(),
    });
    pasteEvent.clipboardData?.setData("text", "");
    otpInputs[0].dispatchEvent(pasteEvent);
    fixture.detectChanges();

    setTimeout(() => {
      expect(otpInputs[0].value).toBe("");
      expect(emitSpy).not.toHaveBeenCalled();
      done();
    });
  });

  it("should reject pasting non-numeric values", (done) => {
    const pasteEvent = new ClipboardEvent("paste", {
      clipboardData: new DataTransfer(),
    });
    pasteEvent.clipboardData?.setData("text", "12abc");

    otpInputs[0].dispatchEvent(pasteEvent);
    fixture.detectChanges();

    setTimeout(() => {
      expect(hostComponent.emittedValue).not.toBe("12abc");
      done();
    });
  });

  it("should update inputs when readValue changes", () => {
    hostComponent.readValue = "654321";
    fixture.detectChanges();

    otpInputs.forEach((input, index) => {
      expect(input.value).toBe(hostComponent.readValue[index]);
    });
  });

  it("should apply bg-gb-gray-light-600 when readValue is not empty", () => {
    hostComponent.readValue = "123456";
    fixture.detectChanges();

    otpInputs.forEach((input) => {
      expect(input.classList).toContain("bg-gb-gray-light-600");
    });
  });

  it("should move focus to the next input when typing", (done) => {
    otpInputs[0].value = "";
    fixture.detectChanges();
    const spy = spyOn(otpInputs[1], "focus").and.callThrough();

    otpInputs[0].value = "1";
    otpInputs[0].dispatchEvent(new Event("input"));
    fixture.detectChanges();

    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  it("should call emitOtpValue when an input is typed", () => {
    const spy = spyOn(hostComponent, "onValueChange");

    otpInputs[0].value = "1";
    otpInputs[0].dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it("should select the input text on focus", () => {
    const spy = spyOn(otpInputs[2], "select");

    otpInputs[2].dispatchEvent(new Event("focus"));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it("should trigger handleInput on input event", () => {
    const spy = spyOn(hostComponent, "onValueChange");
    otpInputs[3].dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it("should trigger handleFocus on focus event", () => {
    const spy = spyOn(otpInputs[4], "select");
    otpInputs[4].dispatchEvent(new Event("focus"));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it("should allow left click when input is empty", (done) => {
    otpInputs[0].value = "";
    fixture.detectChanges();

    const focusSpy = spyOn(otpInputs[0], "focus").and.callThrough();

    const mouseDownEvent = new MouseEvent("mousedown", { button: 0 });
    otpInputs[0].dispatchEvent(mouseDownEvent);
    fixture.detectChanges();

    setTimeout(() => {
      expect(focusSpy).not.toHaveBeenCalled();
      done();
    });
  });

  it("should prevent default and focus input when left clicking a filled input", (done) => {
    otpInputs[0].value = "5";
    fixture.detectChanges();

    const focusSpy = spyOn(otpInputs[0], "focus").and.callThrough();
    const preventDefaultSpy = jasmine.createSpy("preventDefault");

    const mouseDownEvent = new MouseEvent("mousedown", { button: 0 });
    Object.defineProperty(mouseDownEvent, "preventDefault", { value: preventDefaultSpy });

    otpInputs[0].dispatchEvent(mouseDownEvent);
    fixture.detectChanges();

    setTimeout(() => {
      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(focusSpy).toHaveBeenCalled();
      done();
    });
  });
});
