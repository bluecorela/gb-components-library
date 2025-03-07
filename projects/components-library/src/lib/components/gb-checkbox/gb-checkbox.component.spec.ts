import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { GbCheckboxComponent } from "./gb-checkbox.component";

@Component({
  selector: "gb-host",
  standalone: true,
  template: `<gb-checkbox
              [identity]="identity"
              [value]="value"
              [label]="label"
              [color]="color"
              [level]="level"
              [disabled]="disabled"
              [extraClasses]="extraClasses"
              (valueChange)="onValueChange($event)">
            </gb-checkbox>`,
  imports: [GbCheckboxComponent],
})
export class GbHostComponent {
  identity: string = "testCheckbox";
  value: boolean = false;
  label: string = "Test Checkbox";
  color: string = "blue";
  level: number = 500;
  disabled: boolean = false;
  extraClasses: string = "custom-class";

  onValueChange(newValue: boolean) {
    this.value = newValue;
  }
}

describe("GbCheckboxComponent", () => {
  let hostComponent: GbHostComponent;
  let fixture: ComponentFixture<GbHostComponent>;
  let checkboxElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GbHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    checkboxElement = fixture.nativeElement.querySelector("gb-checkbox div");
  });

  it("should initialize with correct values", () => {
    expect(checkboxElement).toBeTruthy();
    expect(hostComponent.identity).toBe("testCheckbox");
    expect(hostComponent.value).toBeFalse();
    expect(hostComponent.label).toBe("Test Checkbox");
  });

  it("should emit valueChange when updateValue() is called", () => {
    spyOn(hostComponent, "onValueChange");

    checkboxElement.click();
    fixture.detectChanges();

    expect(hostComponent.onValueChange).toHaveBeenCalledWith(true);
  });

  it("should not toggle when disabled", () => {
    hostComponent.disabled = true;
    fixture.detectChanges();

    expect(hostComponent.value).toBeFalse();

    checkboxElement.click();
    fixture.detectChanges();

    expect(hostComponent.value).toBeFalse();
  });
});
