import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IonIcon, IonSpinner } from "@ionic/angular/standalone";
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

    const buttonElement = fixture.nativeElement.querySelector("gb-btn button");

    expect(buttonElement.className).toContain("bg-gb-blue-500");
    expect(buttonElement.className).toContain("text-white");
    expect(buttonElement.className).toContain("border-gb-blue-500");
    expect(buttonElement.className).toContain("hover:bg-gb-blue-600");
    expect(buttonElement.className).toContain("active:bg-gb-blue-700");
    expect(buttonElement.className).toContain("disabled:bg-gb-gray-light-300");
  });

  it("should apply correct classes when fill is outline", () => {
    hostComponent.fill = "outline";
    hostComponent.color = "green";
    hostComponent.level = 300;

    fixture.detectChanges();

    const buttonElement = fixture.nativeElement.querySelector("gb-btn button");

    expect(buttonElement.className).toContain("text-gb-green-300");
    expect(buttonElement.className).toContain("border-gb-green-300");
    expect(buttonElement.className).toContain("bg-gb-no-color");
  });

  it("should correctly calculate hover (h), active (a), and disabled (d) levels", () => {
    hostComponent.level = 600;
    fixture.detectChanges();
    let buttonElement = fixture.nativeElement.querySelector("gb-btn button");

    expect(buttonElement.className).toContain("hover:bg-gb-blue-700");
    expect(buttonElement.className).toContain("active:bg-gb-blue-800");
    expect(buttonElement.className).toContain("disabled:bg-gb-gray-light-300");

    hostComponent.level = 900;
    fixture.detectChanges();
    buttonElement = fixture.nativeElement.querySelector("gb-btn button");

    expect(buttonElement.className).toContain("hover:bg-gb-blue-950");
    expect(buttonElement.className).toContain("active:bg-gb-blue-950");
    expect(buttonElement.className).toContain("disabled:bg-gb-gray-light-300");

    hostComponent.level = 100;
    fixture.detectChanges();
    buttonElement = fixture.nativeElement.querySelector("gb-btn button");

    expect(buttonElement.className).toContain("hover:bg-gb-blue-200");
    expect(buttonElement.className).toContain("active:bg-gb-blue-300");
    expect(buttonElement.className).toContain("disabled:bg-gb-gray-light-300");

    hostComponent.level = 10;
    fixture.detectChanges();
    buttonElement = fixture.nativeElement.querySelector("gb-btn button");

    expect(buttonElement.className).toContain("hover:bg-gb-blue-110");
    expect(buttonElement.className).toContain("active:bg-gb-blue-210");
    expect(buttonElement.className).toContain("disabled:bg-gb-gray-light-300");
  });
});
