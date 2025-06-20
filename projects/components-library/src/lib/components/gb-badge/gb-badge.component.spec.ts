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

  it("should compute correct borderClass when badgeType is outline", () => {
    fixture.componentRef.setInput("borderColor", "example-color");
    fixture.componentRef.setInput("badgeType", "outline");
    fixture.detectChanges();

    expect(component.borderClass()).toEqual("border example-color" )
  });
});
