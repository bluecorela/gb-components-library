import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { GbProgressBarComponent } from "./gb-progress-bar.component";

@Component({
  selector: "gb-host",
  standalone: true,
  template: `<gb-progress-bar [progress]="progress" [color]="color" [level]="level"></gb-progress-bar>`,
  imports: [GbProgressBarComponent],
})
export class GbHostComponent {
  progress: number = 50;
  color: string = "blue";
  level: number = 500;
}

describe("GbProgressBarComponent", () => {
  let hostComponent: GbHostComponent;
  let fixture: ComponentFixture<GbHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GbHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(hostComponent).toBeTruthy();
  });

  it("should apply correct classes for default values", () => {
    fixture.detectChanges();
    const progressBarElement = fixture.nativeElement.querySelector("div > div > div");
    expect(progressBarElement.classList).toContain("absolute");
    expect(progressBarElement.classList).toContain("top-0");
    expect(progressBarElement.classList).toContain("left-0");
    expect(progressBarElement.classList).toContain("h-full");
    expect(progressBarElement.classList).toContain("bg-gb-blue-500");
    expect(progressBarElement.classList).toContain("gb-w-50");
    expect(progressBarElement.classList).toContain("rounded-2xl");
  });

  it("should update width when progress changes", () => {
    hostComponent.progress = 75;
    fixture.detectChanges();
    const progressBarElement = fixture.nativeElement.querySelector("div > div > div");

    expect(progressBarElement.className).toContain("gb-w-75");
  });

  it("should cap progress at 100%", () => {
    hostComponent.progress = 150;
    fixture.detectChanges();
    const progressBarElement = fixture.nativeElement.querySelector("div > div > div");

    expect(progressBarElement.className).toContain("gb-w-100");
  });

  it("should set minimum progress to 0%", () => {
    hostComponent.progress = -10;
    fixture.detectChanges();
    const progressBarElement = fixture.nativeElement.querySelector("div > div > div");

    expect(progressBarElement.className).toContain("gb-w-0");
  });

  it("should update color dynamically", () => {
    hostComponent.color = "red";
    fixture.detectChanges();
    const progressBarElement = fixture.nativeElement.querySelector("div > div > div");

    expect(progressBarElement.className).toContain("bg-gb-red-500");
  });

  it("should update level dynamically", () => {
    hostComponent.level = 700;
    fixture.detectChanges();
    const progressBarElement = fixture.nativeElement.querySelector("div > div > div");

    expect(progressBarElement.className).toContain("bg-gb-blue-700");
  });
});
