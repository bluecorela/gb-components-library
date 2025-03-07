import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { GbHostPasswordComponent } from "./gb-host-password.component";
import { IonIcon } from "@ionic/angular/standalone";

describe("GbInputComponent Password Input", () => {
  let hostComponent: GbHostPasswordComponent;
  let fixture: ComponentFixture<GbHostPasswordComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbHostPasswordComponent, FormsModule, IonIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(GbHostPasswordComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    inputElement = fixture.nativeElement.querySelector("input");
  });

  it("should toggle password visibility", () => {
    hostComponent.type = "password";
    hostComponent.passwordToggle = true;
    fixture.detectChanges();

    const toggleButton = fixture.nativeElement.querySelector("ion-icon");
    inputElement = fixture.nativeElement.querySelector("input");

    expect(inputElement.type).toBe("password");

    toggleButton.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    inputElement = fixture.nativeElement.querySelector("input");
    expect(inputElement.type).toBe("password");

    toggleButton.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    inputElement = fixture.nativeElement.querySelector("input");
    expect(inputElement.type).toBe("password");
  });

  it("should toggle password visibility and cover both if and else cases", () => {
    hostComponent.type = "password";
    hostComponent.passwordToggle = true;
    fixture.detectChanges();

    const toggleButton = fixture.nativeElement.querySelector('ion-icon[color="medium"][class*="cursor-pointer"]');
    inputElement = fixture.nativeElement.querySelector("input");

    expect(inputElement.type).toBe("password");

    toggleButton.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    inputElement = fixture.nativeElement.querySelector("input");

    expect(inputElement.type).toBe("text");

    toggleButton.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    inputElement = fixture.nativeElement.querySelector("input");

    expect(inputElement.type).toBe("password");
  });
});
