import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { GbIconComponent } from "./gb-icon.component";

describe("GbIconComponent", () => {
  let component: GbIconComponent;
  let fixture: ComponentFixture<GbIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), GbIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GbIconComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("icon", "home");
    fixture.componentRef.setInput("color", "primary");
    fixture.componentRef.setInput("size", "large");
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should ngOnInit with fromFile", () => {
    fixture.componentRef.setInput("fromFile", true);
    component.ngOnInit();
    expect(component.iconLoaded.call(this)).toBeTrue();
  });

  it("should ngOnInit with fromSrc", () => {
    fixture.componentRef.setInput("fromSrc", true);
    component.ngOnInit();
    expect(component.iconLoaded.call(this)).toBeTrue();
  });
});
