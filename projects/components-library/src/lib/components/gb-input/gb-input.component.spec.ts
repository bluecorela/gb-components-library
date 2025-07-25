import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { IonIcon } from "@ionic/angular/standalone";
import { GbInputComponent } from "./gb-input.component";

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
  regex: RegExp = /^[A-Za-z0-9]{6,}$/;
  required: boolean = true;
}

describe("GbInputComponent", () => {
  let hostComponent: GbHostComponent;
  let fixture: ComponentFixture<GbHostComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbHostComponent, FormsModule, IonIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(GbHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    inputElement = fixture.nativeElement.querySelector("input");
  });

  it("should initialize model with value input", (done) => {
    hostComponent.value = "Test Value";

    fixture.detectChanges();

    setTimeout(() => {
      fixture.detectChanges();

      inputElement = fixture.nativeElement.querySelector("input");
      expect(inputElement.value).toBe("Test Value");
      done();
    }, 0);
  });

  it("should apply error class when input value does not match regex", (done) => {
    hostComponent.regex = /^[A-Za-z0-9]{6,}$/;
    fixture.detectChanges();

    inputElement.value = "abc";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    setTimeout(() => {
      expect(inputElement.className).toContain("border-gb-error-500");
      expect(inputElement.className).toContain("focus:border-gb-error-500");
      done();
    });
  });

  it("should apply error class when required field is empty and loses focus", () => {
    hostComponent.value = "";
    fixture.detectChanges();

    inputElement.dispatchEvent(new Event("focusout"));
    fixture.detectChanges();

    expect(inputElement.className).toContain("border-gb-error-500");
    expect(inputElement.className).toContain("focus:border-gb-error-500");
  });

  it("should blur input when clicking outside", () => {
    const inputDebug = fixture.debugElement.query(
      (el) => el.name === "gb-input"
    );
    const inputComponent = inputDebug.componentInstance as GbInputComponent;
    spyOn(inputComponent, "type").and.returnValue("text");
    const blurSpy = spyOn(inputComponent.inputElement.nativeElement, "blur");
    const clickEvent = new MouseEvent("click", { bubbles: true });
    document.dispatchEvent(clickEvent);
    fixture.detectChanges();
    expect(blurSpy).toHaveBeenCalled();
  });

});
