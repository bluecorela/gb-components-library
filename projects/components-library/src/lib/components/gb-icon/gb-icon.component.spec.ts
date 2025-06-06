import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { GbIconComponent } from "./gb-icon.component";
import { IonicModule } from "@ionic/angular";

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

  it("should ngOnInit with from=file and set iconLoaded to true", async () => {
    spyOn(window, "fetch").and.resolveTo(new Response('<svg fill="#000"></svg>', { status: 200 }));
    fixture.componentRef.setInput("from", "file");
    fixture.componentRef.setInput("icon", "home");
    fixture.detectChanges();
    await component.ngOnInit();
    expect(component.iconLoaded()).toBeTrue();
  });
});
