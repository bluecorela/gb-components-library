import { ModalController, ToastController } from "@ionic/angular/standalone";
import { TestBed } from "@angular/core/testing";
import { Utils as UtilsCompLib } from "components-library";
import { Utils as UtilsService } from "./utils.service";

class MockModalController {
  private shouldReturnNull = false;

  setReturnNull(value: boolean) {
    this.shouldReturnNull = value;
  }

  create = jasmine.createSpy("create").and.callFake(() =>
    Promise.resolve({
      present: jasmine.createSpy("present").and.returnValue(Promise.resolve()),
      onWillDismiss: jasmine
        .createSpy("onWillDismiss")
        .and.callFake(() =>
          Promise.resolve(this.shouldReturnNull ? { data: null } : { data: { action: "confirmed" } }),
        ),
      dismiss: jasmine.createSpy("dismiss"),
    } as Partial<HTMLIonModalElement> as HTMLIonModalElement),
  );
}

class MockToastController {
  create = jasmine.createSpy("create").and.callFake(() => ({
    present: jasmine.createSpy("present").and.returnValue(Promise.resolve()),
  }));
}

describe("Utils Service", () => {
  let utilsService: UtilsService;
  let utilsCompLib: UtilsCompLib;
  let toastCtrl: MockToastController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UtilsService,
        UtilsCompLib,
        { provide: ModalController, useClass: MockModalController },
        { provide: ToastController, useClass: MockToastController },
      ],
    });
    utilsService = TestBed.inject(UtilsService);
    utilsCompLib = TestBed.inject(UtilsCompLib);
    toastCtrl = TestBed.inject(ToastController) as any;
  });

  it("should be created", () => {
    expect(utilsService).toBeTruthy();
  });

  it("should create and present a modal", async () => {
    const action = await utilsCompLib.openModal({
      props: {
        type: "warning",
        header: "Lorem ipsum dolor",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie molestie mi id vehicula. Aliquam sodales congue vulputate.",
        primary: "Aceptar",
        secondary: "Cancelar",
      },
    });
    expect(action).toBe("confirmed");
  });

  it("should create and present a modal with fullscreen parameter", async () => {
    const action = await utilsCompLib.openModal({
      props: {
        type: "warning",
        header: "Lorem ipsum dolor",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie molestie mi id vehicula. Aliquam sodales congue vulputate.",
        primary: "Aceptar",
        secondary: "Cancelar",
      },
      mode: "dialog",
    });
    expect(action).toBe("confirmed");
  });

  it("should create and present a modal with component in null", async () => {
    const action = await utilsCompLib.openModal({
      props: {
        type: "warning",
        header: "Lorem ipsum dolor",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie molestie mi id vehicula. Aliquam sodales congue vulputate.",
        primary: "Aceptar",
        secondary: "Cancelar",
      },
      comp: null,
      mode: "card",
    });
    expect(action).toBe("confirmed");
  });

  it("should return null when modal is dismissed without data", async () => {
    const modalCtrl = TestBed.inject(ModalController) as unknown as MockModalController;
    modalCtrl.setReturnNull(true);
    const action = await utilsCompLib.openModal({
      props: {
        type: "warning",
        header: "Lorem ipsum dolor",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        primary: "Aceptar",
        secondary: "Cancelar",
      },
      mode: "dialog",
    });

    expect(action).toBeNull();
  });

  it("should create and present a toast with default parameters", async () => {
    const text = "This is a test message";
    const duration = 5000;
    const position = "top";
    await utilsCompLib.openToast({ text });

    expect(toastCtrl.create).toHaveBeenCalled();

    const toastOptions = toastCtrl.create.calls.mostRecent().args[0];
    expect(toastOptions.message).toBe(text);
    expect(toastOptions.duration).toBe(duration);
    expect(toastOptions.position).toBe(position);
    expect(toastOptions.color).toBe("gb-white-500");
    expect(toastOptions.icon).toBe("information-circle-outline");
    expect(toastOptions.cssClass).toContain("gb-toast-gb-blue-500");
  });

  it("should create and present a toast with type 'default'", async () => {
    const text = "Default type message";
    await utilsCompLib.openToast({ text, type: "default" });

    const toastOptions = toastCtrl.create.calls.mostRecent().args[0];
    expect(toastOptions.icon).toBe("information-circle-outline");
    expect(toastOptions.cssClass).toContain("gb-toast-gb-blue-500");
  });

  it("should create and present a toast with type 'error'", async () => {
    const text = "Error type message";
    await utilsCompLib.openToast({ text, type: "error" });

    const toastOptions = toastCtrl.create.calls.mostRecent().args[0];
    expect(toastOptions.icon).toBe("close-circle-outline");
    expect(toastOptions.cssClass).toContain("gb-toast-gb-error-500");
  });

  it("should create and present a toast with type 'success'", async () => {
    const text = "Success type message";
    await utilsCompLib.openToast({ text, type: "success" });

    const toastOptions = toastCtrl.create.calls.mostRecent().args[0];
    expect(toastOptions.icon).toBe("checkmark-circle-outline");
    expect(toastOptions.color).toBe("gb-white-500");
    expect(toastOptions.cssClass).toContain("gb-toast-gb-success-500");
  });

  it("should create and present a toast with type 'warning'", async () => {
    const text = "Warning type message";
    await utilsCompLib.openToast({ text, type: "warning" });

    const toastOptions = toastCtrl.create.calls.mostRecent().args[0];
    expect(toastOptions.icon).toBe("warning-outline");
    expect(toastOptions.color).toBe("gb-white-500");
    expect(toastOptions.cssClass).toContain("gb-toast-gb-warning-500");
  });
});
