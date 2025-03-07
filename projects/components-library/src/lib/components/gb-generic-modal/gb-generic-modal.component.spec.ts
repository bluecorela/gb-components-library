import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IonCol, IonGrid, IonIcon, IonRow, ModalController } from "@ionic/angular/standalone";
import { Component } from "@angular/core";
import { GbBtnComponent } from "../gb-btn/gb-btn.component";
import { GbGenericModalComponent } from "../gb-generic-modal/gb-generic-modal.component";

@Component({
  selector: "gb-host-modal",
  standalone: true,
  template: `<gb-generic-modal
               [type]="type"
               [header]="header"
               [body]="body"
               [primary]="primary"
               [secondary]="secondary">
             </gb-generic-modal>`,
  imports: [GbGenericModalComponent, IonGrid, IonRow, IonCol, IonIcon, GbBtnComponent],
})
export class GbHostModalComponent {
  type: "checkmark" | "warning" | "alert" = "checkmark";
  header: string = "Test Header";
  body: string = "Test Body";
  primary: string = "confirm";
  secondary: string = "cancel";
}

describe("GbGenericModalComponent", () => {
  let hostComponent: GbHostModalComponent;
  let fixture: ComponentFixture<GbHostModalComponent>;
  let modalControllerSpy: jasmine.SpyObj<ModalController>;

  beforeEach(async () => {
    modalControllerSpy = jasmine.createSpyObj("ModalController", ["dismiss"]);

    await TestBed.configureTestingModule({
      imports: [GbHostModalComponent, IonGrid, IonRow, IonCol, IonIcon, GbBtnComponent],
      providers: [{ provide: ModalController, useValue: modalControllerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(GbHostModalComponent);
    hostComponent = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it("should create the modal component", () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should close the modal with "cancel" when the secondary button is clicked', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const modalElement = fixture.debugElement.children[0].nativeElement;
    const secondaryButton = modalElement.querySelector('gb-btn[identity="cancel_btn"] button');

    expect(secondaryButton).not.toBeNull();
    if (secondaryButton) {
      secondaryButton.click();
      fixture.detectChanges();
      await fixture.whenStable();
    }
    expect(modalControllerSpy.dismiss).toHaveBeenCalledWith({ action: "cancel" });
  });

  it("should correctly compute text properties", async () => {
    await fixture.whenStable();
    const modalComponent = fixture.debugElement.children[0].componentInstance as GbGenericModalComponent;

    expect(modalComponent.headerText()).toContain("Test Header");
    expect(modalComponent.bodyText()).toContain("Test Body");
    expect(modalComponent.primaryText()).toContain("confirm");
    expect(modalComponent.secondaryText()).toContain("cancel");
  });
});
