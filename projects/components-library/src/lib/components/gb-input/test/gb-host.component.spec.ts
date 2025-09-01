import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule } from "@angular/forms";
import { GbHostComponent } from "./gb-host.component";
import { IonIcon } from "@ionic/angular/standalone";

describe("GbInputComponent", () => {
  let hostComponent: GbHostComponent;
  let fixture: ComponentFixture<GbHostComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbHostComponent, FormsModule, IonIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(GbHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    inputElement = fixture.nativeElement.querySelector("input");
  });

  it("should initialize model with value input", (done) => {
    hostComponent.value = "Test Value";
    fixture.detectChanges();

    setTimeout(() => {
      fixture.detectChanges();
      inputElement = fixture.nativeElement.querySelector("input");
      expect(inputElement.value).toBe("Test Value");
      done();
    }, 0);
  });
});
