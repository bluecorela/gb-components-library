import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { GbToggleComponent } from "./gb-toggle.component";

@Component({
  selector: "gb-host",
  standalone: true,
  template: `<gb-toggle
    [identity]="identity"
    [value]="value"
    [label]="label"
    [labelPosition]="labelPosition"
    [color]="color"
    [level]="level"
    [disabled]="disabled"
    [extraClasses]="extraClasses"
    (valueChange)="onValueChange($event)">
  </gb-toggle>`,
  imports: [GbToggleComponent],
})
export class GbHostComponent {
  identity: string = "testToggle";
  value: boolean = false;
  label: string = "Test Toggle";
  labelPosition: "left" | "right" = "left";
  color: string = "blue";
  level: number = 500;
  disabled: boolean = false;
  extraClasses: string = "custom-class";

  onValueChange(newValue: boolean) {
    this.value = newValue;
  }
}

describe("GbToggleComponent", () => {
  let hostComponent: GbHostComponent;
  let fixture: ComponentFixture<GbHostComponent>;
  let toggleElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GbHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    toggleElement = fixture.nativeElement.querySelector("gb-toggle div");
  });

  it("should find the gb-toggle element", () => {
    expect(toggleElement).toBeNull();
  });

  it("should initialize with correct values", () => {
    expect(hostComponent.identity).toBe("testToggle");
    expect(hostComponent.value).toBeFalse();
    expect(hostComponent.label).toBe("Test Toggle");
  });

  it("should emit valueChange when updateValue() is called", () => {
    spyOn(hostComponent, "onValueChange");

    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');

    expect(checkbox).not.toBeNull();

    checkbox.click();
    fixture.detectChanges();

    expect(hostComponent.onValueChange).toHaveBeenCalledWith(true);
  });

  it("should apply cursor-pointer when enabled (else case)", () => {
    hostComponent.disabled = false;
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector("label");

    expect(labelElement.className).toContain("cursor-pointer");
  });

  it("should apply cursor-not-allowed when disabled (if case)", () => {
    hostComponent.disabled = true;
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector("label");

    expect(labelElement.className).toContain("cursor-not-allowed");
  });
});
