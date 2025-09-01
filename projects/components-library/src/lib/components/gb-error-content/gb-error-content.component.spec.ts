import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GbErrorContentComponent } from "./gb-error-content.component";

describe("GbErrorComponent", () => {
  let fixture: ComponentFixture<GbErrorContentComponent>;
  let component: GbErrorContentComponent;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [GbErrorContentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(GbErrorContentComponent, {
        set: { template: "" },
      })
      .compileComponents();

    fixture = TestBed.createComponent(GbErrorContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should emit 'clicked' when onClick is called", () => {
    spyOn(component.clicked, "emit");
    component.onClick();
    expect(component.clicked.emit).toHaveBeenCalled();
  });
});
