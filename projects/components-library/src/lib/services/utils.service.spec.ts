import { signal } from '@angular/core';
import { TestBed } from "@angular/core/testing";
import { AlertController, LoadingController, ModalController, ToastController } from "@ionic/angular/standalone";
import FormObject from "../types/FormObject";
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
          Promise.resolve(this.shouldReturnNull ? { data: null } : { data: { action: "confirmed" } })
        ),
      dismiss: jasmine.createSpy("dismiss"),
    } as Partial<HTMLIonModalElement> as HTMLIonModalElement)
  );
}

class MockToastController {
  create = jasmine.createSpy("create").and.callFake(() => ({
    present: jasmine.createSpy("present").and.returnValue(Promise.resolve()),
  }));
}

class MockLoadingController {
  create = jasmine.createSpy("create").and.callFake(() =>
    Promise.resolve({
      present: jasmine.createSpy("present").and.returnValue(Promise.resolve()),
      dismiss: jasmine.createSpy("dismiss").and.returnValue(Promise.resolve()),
    } as Partial<HTMLIonLoadingElement> as HTMLIonLoadingElement)
  );
}

class MockAlert {
  present = jasmine.createSpy('present').and.resolveTo();
}

class MockAlertController {
  create = jasmine.createSpy('create').and.callFake((opts) =>
    Promise.resolve(Object.assign(new MockAlert(), { data: opts }))
  );
}

describe("UtilsService", () => {
  let utilsService: UtilsService;
  let modalCtrl: MockModalController;
  let toastCtrl: MockToastController;
  let alertCtrl: MockAlertController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UtilsService,
        { provide: ModalController, useClass: MockModalController },
        { provide: ToastController, useClass: MockToastController },
        { provide: LoadingController, useClass: MockLoadingController },
        { provide: AlertController, useClass: MockAlertController },
      ],
    });

    utilsService = TestBed.inject(UtilsService);
    modalCtrl = TestBed.inject(ModalController) as any;
    toastCtrl = TestBed.inject(ToastController) as any;
    alertCtrl = TestBed.inject(AlertController) as any;
  });

  it("should be created", () => {
    expect(utilsService).toBeTruthy();
  });

  it("should open modal with mode 'dialog'", async () => {
    const action = await utilsService.openModal({
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

  it("should open modal with mode 'card'", async () => {
    const action = await utilsService.openModal({
      props: {
        type: "warning",
        header: "Lorem ipsum dolor",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie molestie mi id vehicula. Aliquam sodales congue vulputate.",
        primary: "Aceptar",
        secondary: "Cancelar",
      },
      mode: "card",
    });
    expect(action).toBe("confirmed");
  });

  it("should open modal with null component", async () => {
    const action = await utilsService.openModal({
      props: {
        type: "warning",
        header: "Lorem ipsum dolor",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie molestie mi id vehicula. Aliquam sodales congue vulputate.",
        primary: "Aceptar",
        secondary: "Cancelar",
      },
      comp: null,
    });
    expect(action).toBe("confirmed");
  });

  it("should call enter and leave animation if provided", async () => {
    const fakeAnim = () => {};
    const action = await utilsService.openModal({
      props: {
        type: "warning",
        header: "Lorem ipsum dolor",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie molestie mi id vehicula. Aliquam sodales congue vulputate.",
        primary: "Aceptar",
        secondary: "Cancelar",
      },
      enterAnimation: fakeAnim,
      leaveAnimation: fakeAnim,
    });
    expect(action).toBe("confirmed");
  });

  it("should return null when modal is dismissed without data", async () => {
    modalCtrl.setReturnNull(true);
    const action = await utilsService.openModal({
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

  it("should open toast with default params", async () => {
    await utilsService.openToast({ text: "Hello world" });
    const toastOptions = toastCtrl.create.calls.mostRecent().args[0];
    expect(toastOptions.message).toBe("Hello world");
    expect(toastOptions.icon).toBe("information-circle-outline");
    expect(toastOptions.cssClass).toContain("gb-toast-gb-blue-500");
  });

  it("should open toast with type 'error'", async () => {
    await utilsService.openToast({ text: "Error!", type: "error" });
    const toastOptions = toastCtrl.create.calls.mostRecent().args[0];
    expect(toastOptions.icon).toBe("close-circle-outline");
    expect(toastOptions.cssClass).toContain("gb-toast-gb-error-500");
  });

  it("should open toast with type 'success'", async () => {
    await utilsService.openToast({ text: "Done!", type: "success" });
    const toastOptions = toastCtrl.create.calls.mostRecent().args[0];
    expect(toastOptions.icon).toBe("checkmark-circle-outline");
    expect(toastOptions.cssClass).toContain("gb-toast-gb-success-500");
  });

  it("should open toast with type 'warning'", async () => {
    await utilsService.openToast({ text: "Cuidado!", type: "warning" });
    const toastOptions = toastCtrl.create.calls.mostRecent().args[0];
    expect(toastOptions.icon).toBe("warning-outline");
    expect(toastOptions.cssClass).toContain("gb-toast-gb-warning-500");
  });

  describe('openAlert', () => {
    it('should create and present alert with header, message, buttons and cssClass', async () => {
      const params = {
        header: 'Título',
        subHeader: 'Subtítulo',
        message: 'Este es el mensaje',
        mode: 'ios' as const,
        buttons: [{ text: 'OK', role: 'confirm', cssClass: 'btn-ok' }],
        cssClass: 'alert-custom'
      };

      await utilsService.openAlert(params);

      expect(alertCtrl.create).toHaveBeenCalledWith(jasmine.objectContaining({
        header: 'Título',
        subHeader: 'Subtítulo',
        message: 'Este es el mensaje',
        mode: 'ios',
        buttons: params.buttons,
        cssClass: 'alert-custom'
      }));

      const createdAlert = await alertCtrl.create.calls.mostRecent().returnValue;
      expect((await createdAlert).present).toHaveBeenCalled();
    });

    it('should create alert without optional params if not provided', async () => {
      await utilsService.openAlert({ message: 'Solo mensaje' });

      expect(alertCtrl.create).toHaveBeenCalledWith(jasmine.objectContaining({
        message: 'Solo mensaje',
        mode: 'md'
      }));
    });
  });

  describe('openLoader', () => {
    it('should create and present a loader', async () => {
      const loadingSpy = jasmine.createSpyObj('HTMLIonLoadingElement', ['present']);
      const ldngCtrl = TestBed.inject(LoadingController) as jasmine.SpyObj<LoadingController>;
      ldngCtrl.create.and.resolveTo(loadingSpy);
      await utilsService.openLoader({ message: 'Cargando...' });
      expect(ldngCtrl.create).toHaveBeenCalledWith({ message: 'Cargando...' });
      expect(loadingSpy.present).toHaveBeenCalled();
    });
  });

  describe('validateString', () => {
    it('should return true if all regex validators match', () => {
      const result = utilsService.validateString("Hola", [/^H/, /a$/]);
      expect(result).toBeTrue();
    });

    it('should return false if at least one regex validator fails', () => {
      const result = utilsService.validateString("Hola", [/^H/, /z$/]);
      expect(result).toBeFalse();
    });
  });

  describe('validateMinMax', () => {
    it('should return false if num is NaN', () => {
      expect(utilsService.validateMinMax(1, 10, NaN)).toBeFalse();
    });

    it('should return false if num is less than min', () => {
      expect(utilsService.validateMinMax(5, 10, 3)).toBeFalse();
    });

    it('should return false if num is greater than max', () => {
      expect(utilsService.validateMinMax(1, 5, 6)).toBeFalse();
    });

    it('should return true if num is within range', () => {
      expect(utilsService.validateMinMax(1, 10, 5)).toBeTrue();
    });
  });

  describe('validateField', () => {
    it('should return true if no validator and no min/max provided', () => {
      const result = utilsService.validateField("abc", 5);
      expect(result).toBeTrue();
    });

    it('should return true if regex validator passes', () => {
      const result = utilsService.validateField("abc", 0, /^[a-z]+$/);
      expect(result).toBeTrue();
    });

    it('should return false if regex validator fails', () => {
      const result = utilsService.validateField("123", 0, /^[a-z]+$/);
      expect(result).toBeFalse();
    });

    it('should return true if value is within min/max range', () => {
      const result = utilsService.validateField("abc", 5, true, 1, 10);
      expect(result).toBeTrue();
    });

    it('should return false if value is out of min/max range', () => {
      const result = utilsService.validateField("abc", 0, true, 1, 10);
      expect(result).toBeFalse();
    });

    it('should return false if both validations are present and one fails', () => {
      const result = utilsService.validateField("123", 0, /^[a-z]+$/, 1, 10);
      expect(result).toBeFalse(); // falla el regex y el rango
    });

    it('should return true if both validations pass', () => {
      const result = utilsService.validateField("abc", 5, /^[a-z]+$/, 1, 10);
      expect(result).toBeTrue();
    });
  });

  describe('validateForm', () => {
    it('should return true when field passes regex validation', () => {
      const formData: FormObject = {
        name: {
          value: signal('Alex'),
          validator: signal(/^[A-Za-z]+$/),
          min: undefined,
          max: undefined,
        },
      };
      expect(utilsService.validateForm(formData)).toBeTrue();
    });

    it('should return false when field fails regex validation', () => {
      const formData: FormObject = {
        name: {
          value: signal('1234'),
          validator: signal(/^[A-Za-z]+$/),
          min: undefined,
          max: undefined,
        },
      };
      expect(utilsService.validateForm(formData)).toBeFalse();
    });

    it('should return true when field passes min/max validation', () => {
      const formData: FormObject = {
        age: {
          value: signal('30'),
          min: 18,
          max: 65,
        },
      };
      expect(utilsService.validateForm(formData)).toBeTrue();
    });

    it('should return false when field fails min/max validation', () => {
      const formData: FormObject = {
        age: {
          value: signal('15'),
          validator: true,
          min: 18,
          max: 65,
        },
      };
      expect(utilsService.validateForm(formData)).toBeFalse();
    });

    it('should return false when validator is boolean and value does not match', () => {
      const formData: FormObject = {
        acceptTerms: {
          value: signal(false),
          validator: true,
          min: undefined,
          max: undefined,
        },
      };
      expect(utilsService.validateForm(formData)).toBeFalse();
    });

    it('should return true when validator is boolean and value matches', () => {
      const formData: FormObject = {
        acceptTerms: {
          value: signal(true),
          validator: true,
          min: undefined,
          max: undefined,
        },
      };
      expect(utilsService.validateForm(formData)).toBeTrue();
    });
  });

  describe('dismissLoader', () => {
    it('should dismiss loader and clear reference', async () => {
      const loadingSpy = jasmine.createSpyObj('HTMLIonLoadingElement', ['dismiss']);
      (utilsService as any).activeLoader.set(loadingSpy);

      utilsService.dismissLoader();

      expect(loadingSpy.dismiss).toHaveBeenCalled();
      expect((utilsService as any).activeLoader()).toBeNull();
    });
  });

  describe('cleanStringForRegex', () => {
    it('should clean special characters for regex', () => {
      const result = utilsService.cleanStringForRegex('Hello. [world]? *regex*');
      expect(result).toBe('Hello[.][ ][[]world[]][?][ ][*]regex[*]');
    });
  });
});
