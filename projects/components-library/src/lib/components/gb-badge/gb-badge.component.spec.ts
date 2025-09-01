import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GbBadgeComponent } from "./gb-badge.component";

describe("GbBadgeComponent", () => {
  let fixture: ComponentFixture<GbBadgeComponent>;
  let component: GbBadgeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GbBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should compute correct borderClass when style is outline", () => {
    fixture.componentRef.setInput("styleBadge", "outline");
    fixture.componentRef.setInput("textColorInput", "text-gb-green-500");
    fixture.detectChanges();

    expect(component.borderColor()).toBe("border-gb-green-500");
    expect(component.borderClass()).toBe("border border-gb-green-500");
  });

  it("should compute correct borderClass when style is solid", () => {
    fixture.componentRef.setInput("styleBadge", "solid");
    fixture.detectChanges();

    expect(component.borderColor()).toBe("");
    expect(component.borderClass()).toBe("border-0");
  });

  it("should apply button layout when type is button", () => {
    fixture.componentRef.setInput("type", "button");
    fixture.detectChanges();

    expect(component.badgeSpacing()).toBe("px-3 py-2");
    expect(component.borderRadius()).toBe("gb-rounded-border-10xl");
    expect(component.textSizeWeight()).toBe("text-md font-red-hat-500");
  });

  it("should apply label layout when type is label", () => {
    fixture.componentRef.setInput("type", "label");
    fixture.detectChanges();

    expect(component.badgeSpacing()).toBe("px-2.5 py-1");
    expect(component.borderRadius()).toBe("gb-rounded-border-6xl");
    expect(component.textSizeWeight()).toBe("text-sm font-red-hat-600");
  });

  it("should compute full class correctly", () => {
    fixture.componentRef.setInput("type", "label");
    fixture.componentRef.setInput("styleBadge", "outline");
    fixture.componentRef.setInput("textColorInput", "text-gb-red-500");
    fixture.componentRef.setInput("bgColorInput", "bg-transparent");
    fixture.detectChanges();

    const result = component.class();

    expect(result).toContain("inline-flex items-center");
    expect(result).toContain("px-2.5 py-1");
    expect(result).toContain("gb-rounded-border-6xl");
    expect(result).toContain("text-sm font-red-hat-600");
    expect(result).toContain("bg-transparent");
    expect(result).toContain("text-gb-red-500");
    expect(result).toContain("border border-gb-red-500");
  });
});
