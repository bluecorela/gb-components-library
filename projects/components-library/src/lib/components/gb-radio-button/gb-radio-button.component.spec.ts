import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { GbRadioButtonComponent } from "./gb-radio-button.component";

@Component({
  selector: "gb-host",
  standalone: true,
  template: `<gb-radio-button [horizontal]="horizontal" [buttonsList]="buttonsList" [title]="'Opciones'"></gb-radio-button>`,
  imports: [GbRadioButtonComponent],
})
export class GbHostComponent {
  horizontal = true;
  buttonsList = [
    { label: "Opción 1", value: "1" },
    { label: "Opción 2", value: "2" },
  ];
}

describe("GbRadioButtonComponent", () => {
  let fixture: ComponentFixture<GbHostComponent>;
  let hostComponent: GbHostComponent;
  let radioComponent: GbRadioButtonComponent;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GbHostComponent);
    hostComponent = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.directive(GbRadioButtonComponent));
    radioComponent = debugElement.componentInstance;
  });

  it("should create", () => {
    fixture.detectChanges();
    expect(radioComponent).toBeTruthy();
  });

  it("should return 'flex flex-wrap' when horizontal is true", () => {
    hostComponent.horizontal = true;
    fixture.detectChanges();
    expect(radioComponent.directionclasses()).toBe("flex flex-wrap");
  });

  it("should return 'flex flex-col' when horizontal is false", () => {
    hostComponent.horizontal = false;
    fixture.detectChanges();
    expect(radioComponent.directionclasses()).toBe("flex flex-col");
  });

  it("should emit value on onSelectionChange", () => {
    spyOn(radioComponent.valueChange, "emit");
    const testValue = "testValue";
    radioComponent.onSelectionChange(testValue);
    expect(radioComponent.valueChange.emit).toHaveBeenCalledWith(testValue);
  });
});
