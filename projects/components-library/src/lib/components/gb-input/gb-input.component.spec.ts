import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { IonIcon } from "@ionic/angular/standalone";
import { GbInputComponent } from "./gb-input.component";
import { IonicModule } from "@ionic/angular";

fdescribe("GbInputComponent", () => {
  let component: GbInputComponent;
  let fixture: ComponentFixture<GbInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), GbInputComponent, FormsModule, IonIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(GbInputComponent);
    component = fixture.componentInstance;

    // SETS INPUTS
    fixture.componentRef.setInput("type", "text");
    fixture.componentRef.setInput("label", "label");
    fixture.componentRef.setInput("errHint", "errHint");
    fixture.componentRef.setInput("okHint", "okHint");
    fixture.componentRef.setInput("placeholder", "placeholder");
    fixture.componentRef.setInput("value", "value");
    fixture.componentRef.setInput("color", "blue");
    fixture.componentRef.setInput("level", 500);
    fixture.componentRef.setInput("icon", "icon");
    fixture.componentRef.setInput("disabled", false);
    fixture.componentRef.setInput("extraClasses", "extraClasses");
    fixture.componentRef.setInput("passwordToggle", false);
    fixture.componentRef.setInput("regex", "regex");
    fixture.componentRef.setInput("required", false);
    fixture.componentRef.setInput("min", 0);
    fixture.componentRef.setInput("max", 0);
    fixture.componentRef.setInput("identity", "identity");
    fixture.componentRef.setInput("regexMessages", []);
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should toggle password visibility and cover both if and else cases", () => {
    fixture.componentRef.setInput("type", "password");
    fixture.componentRef.setInput("passwordToggle", true);
    fixture.detectChanges();
    component.togglePass();
    expect(component.isShowingPassword.call(this)).toBeTrue();
    component.togglePass();
    expect(component.isShowingPassword.call(this)).toBeFalse();
  });

  it("should update focused signal", () => {
    component.wasFocused();
    expect(component.focused.call(this)).toBeTrue();
  });

  it("should test isValid", () => {
    fixture.componentRef.setInput("regex", undefined);
    component.isValid();
    expect(component.isValid()).toBeTrue();
    fixture.componentRef.setInput("regex", "^\\d{4}$");
    fixture.componentRef.setInput("min", 25);
    fixture.componentRef.setInput("value", "20");
    fixture.componentRef.setInput("valueLoaded", false);
    component.isValid();
    expect(component.isValid()).toBeFalse();
    fixture.componentRef.setInput("max", 25);
    fixture.componentRef.setInput("value", "30");
    fixture.componentRef.setInput("valueLoaded", false);
    component.isValid();
    expect(component.isValid()).toBeFalse();
  });

  it("should validateRegex", () => {
    const reg = ["/[a-z]+/g"];
    fixture.componentRef.setInput("valueLoaded", true);
    fixture.componentRef.setInput("regex", reg);
    fixture.componentRef.setInput("value", "a");
    fixture.componentRef.setInput("model", "a");
    expect(component.validateRegex(reg)).toBeTrue();
  });
});
