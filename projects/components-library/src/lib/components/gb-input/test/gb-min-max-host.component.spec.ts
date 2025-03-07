import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { GbMinMaxHostComponent } from "./gb-min-max-host.component";
import { IonIcon } from "@ionic/angular/standalone";

describe("GbInputComponent - Min & Max Validations", () => {
  let hostComponent: GbMinMaxHostComponent;
  let fixture: ComponentFixture<GbMinMaxHostComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbMinMaxHostComponent, FormsModule, IonIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(GbMinMaxHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    inputElement = fixture.nativeElement.querySelector("input");
  });

  it("should return false if input value is less than min", (done) => {
    hostComponent.min = 10;
    fixture.detectChanges();

    inputElement.value = "5";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    setTimeout(() => {
      expect(inputElement.className).toContain("border-gb-error-500");
      expect(inputElement.className).toContain("focus:border-gb-error-500");
      done();
    });
  });

  it("should return false if input value is greater than max", (done) => {
    hostComponent.max = 20;
    fixture.detectChanges();

    inputElement.value = "25";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    setTimeout(() => {
      expect(inputElement.className).toContain("border-gb-error-500");
      expect(inputElement.className).toContain("focus:border-gb-error-500");
      done();
    });
  });

  it("should return true if input value is within min and max range", (done) => {
    hostComponent.min = 10;
    hostComponent.max = 20;
    fixture.detectChanges();

    inputElement.value = "15";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    setTimeout(() => {
      expect(inputElement.className).not.toContain("border-gb-error-500");
      expect(inputElement.className).not.toContain("focus:border-gb-error-500");
      done();
    });
  });
});
