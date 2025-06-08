import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IonIcon, IonSpinner } from "@ionic/angular/standalone";

import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";
import { GbBtnComponent } from "./gb-btn.component";

@Component({
  selector: "gb-host",
  standalone: true,
  template: `<gb-btn [fill]="fill" [color]="color" [level]="level"></gb-btn>`,
  imports: [GbBtnComponent],
})
export class GbHostComponent {
  fill: "solid" | "outline" = "solid";
  color: string = "blue";
  level: number = 500;
}

describe("GbBtnComponent", () => {
  let hostComponent: GbHostComponent;
  let fixture: ComponentFixture<GbHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbHostComponent, IonIcon, IonSpinner],
    }).compileComponents();

    fixture = TestBed.createComponent(GbHostComponent);
    hostComponent = fixture.componentInstance;
  });

  it("should apply correct classes when fill is solid", () => {
    hostComponent.fill = "solid";
    hostComponent.color = "blue";
    hostComponent.level = 500;
    fixture.detectChanges();

    const gbBtnDebug = fixture.debugElement.query(By.directive(GbBtnComponent));
    const buttonElement: HTMLButtonElement = gbBtnDebug.nativeElement.querySelector("button");

    expect(buttonElement.className).toContain("bg-gb-blue-500");
    expect(buttonElement.className).toContain("text-white");
    expect(buttonElement.className).toContain("border-gb-blue-500");
    expect(buttonElement.className).toContain("hover:border-gb-blue-400");
    expect(buttonElement.className).toContain("active:bg-gb-blue-600");
    expect(buttonElement.className).toContain("disabled:bg-gb-gray-light-500");
  });

  it("should apply correct classes when fill is outline", () => {
    hostComponent.fill = "outline";
    hostComponent.color = "green";
    hostComponent.level = 300;

    fixture.detectChanges();

    const buttonElement = fixture.nativeElement.querySelector("gb-btn button");

    expect(buttonElement.className).toContain("text-gb-green-500");
    expect(buttonElement.className).toContain("border-gb-green-500");
    expect(buttonElement.className).toContain("bg-gb-no-color");
  });

  it("should correctly apply fixed hover, active, and disabled classes", () => {
    hostComponent.fill = "solid";
    hostComponent.color = "blue"; // Este es el valor por defecto en el componente
    fixture.detectChanges();

    const buttonElement = fixture.nativeElement.querySelector("gb-btn button");
    const classList = buttonElement.className;

    expect(classList).toContain("hover:border-gb-blue-400");
    expect(classList).toContain("active:bg-gb-blue-600");
    expect(classList).toContain("border-gb-blue-500");
    expect(classList).toContain("bg-gb-blue-500");
    expect(classList).toContain("text-white");
    expect(classList).toContain("disabled:bg-gb-gray-light-500");
    expect(classList).toContain("disabled:text-gb-dark-600");
  });
});
