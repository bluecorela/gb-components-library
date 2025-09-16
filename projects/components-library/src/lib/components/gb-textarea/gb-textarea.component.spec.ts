import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { IonIcon } from "@ionic/angular/standalone";
import { GbTextAreaComponent } from "./gb-textarea.component";

@Component({
  selector: "gb-textarea",
  standalone: true,
  template: `<gb-textarea
    [value]="'value'"
    [color]="color"
    [level]="level"
    [disabled]="disabled"
    [regex]="regex"
    [required]="required">
  </gb-textarea>`,
  imports: [GbTextAreaComponent],
})
export class GbHostComponent {
  value: string | number = "";
  color: string = "blue";
  level: number = 500;
  disabled: boolean = false;
  passwordToggle: boolean = false;
  regex: RegExp = /^[A-Za-z0-9]{6,}$/;
  required: boolean = true;
}

describe("GbTextAreaComponent", () => {
  let hostComponent: GbHostComponent;
  let fixture: ComponentFixture<GbHostComponent>;
  let textAreaElement: HTMLTextAreaElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbHostComponent, FormsModule, IonIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(GbHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    textAreaElement = fixture.nativeElement.querySelector("input");
  });

  it("should initialize model with value input", (done) => {
    hostComponent.value = "Test Value";

    fixture.detectChanges();

    setTimeout(() => {
      fixture.detectChanges();

      textAreaElement = fixture.nativeElement.querySelector("input");
      expect(textAreaElement.value).toBe("Test Value");
      done();
    }, 0);
  });

  it("should apply error class when input value does not match regex", (done) => {
    hostComponent.regex = /^[A-Za-z0-9]{6,}$/;
    fixture.detectChanges();

    textAreaElement.value = "abc";
    textAreaElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    setTimeout(() => {
      expect(textAreaElement.className).toContain("border-gb-error-500");
      expect(textAreaElement.className).toContain("focus:border-gb-error-500");
      done();
    });
  });

  it("should apply error class when required field is empty and loses focus", () => {
    hostComponent.value = "";
    fixture.detectChanges();

    textAreaElement.dispatchEvent(new Event("focusout"));
    fixture.detectChanges();

    expect(textAreaElement.className).toContain("border-gb-error-500");
    expect(textAreaElement.className).toContain("focus:border-gb-error-500");
  });
});
