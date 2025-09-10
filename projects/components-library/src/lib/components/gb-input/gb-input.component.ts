import * as icons from "ionicons/icons";

// ##### IONIC & ANGULAR
import {
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from "@angular/core";

import { FormsModule } from "@angular/forms";
import { GbIconComponent } from "../gb-icon/gb-icon.component";
import { IonIcon } from "@ionic/angular/standalone";
import { NgxMaskDirective } from "ngx-mask";
import { addIcons } from "ionicons";

@Component({
  selector: "gb-input",
  templateUrl: "./gb-input.component.html",
  styleUrls: ["./gb-input.component.scss"],
  imports: [FormsModule, IonIcon, GbIconComponent, NgxMaskDirective],
})
export class GbInputComponent implements OnInit, OnChanges {
  constructor() {
    addIcons(icons);
    // ##### EFFECTS
    effect(() => {
      if (this.model() !== this.value() && this.valueLoaded()) {
        this.valueChange.emit(this.model());
      }
    }, { allowSignalWrites: true });
  }

  // ##### VIEW CHILDS
  @ViewChild("gbInput") inputElement!: ElementRef<HTMLInputElement>;

  // ##### INJECTS
  elRef = inject(ElementRef);

  @HostListener("document:click", ["$event"])
  onClickOutside(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target) && !["phone", "money"].includes(this.type())) {
      this.inputElement.nativeElement.blur();
    }
  }

  // ##### INPUTS
  type = input<"text" | "password" | "email" | "number" | "phone" | "money">("text");
  inputMode = input<"text" | "decimal" | "email" | "numeric" | "tel" | "url">("text");
  autocapitalize = input<"off" | "none" | "sentences" | "on" | "words" | "characters">("off");
  label = input("");
  errHint = input("");
  okHint = input("");
  placeholder = input("");
  value = input.required<string>();
  color = input("blue");
  level = input(500);
  icon = input<string>("");
  iconPosition = input<string>("left");
  disabled = input(false);
  extraClasses = input("");
  passwordToggle = input(false);
  clearable = input(false);
  regex = input<RegExp | RegExp[]>(new RegExp(""));
  required = input(false);
  requiredMessages = input<string>("");
  min = input<number>();
  max = input<number>();
  identity = input("");
  regexMessages = input<string[]>();
  forceError = input({
    force: signal(false),
    msg: signal(""),
  });
  prefix = input("");

  // ##### SIGNALS
  model = signal<string>("");
  isShowingPassword = signal(false);
  inType = signal("");
  focused = signal(false);
  isFocus = signal(false);
  valueLoaded = signal(false);

  // ##### METHODS
  togglePass() {
    this.isShowingPassword.update((val) => (val = !val));
    if (this.isShowingPassword()) this.inType.update(() => "text");
    else this.inType.update(() => "password");
  }

  wasFocused() {
    this.focused.update(() => true);
    this.isFocus.update((val) => (val = !val));
    this.model.update((val) => val.trim());
  }

  // OUTPUTS
  valueChange = output<string | number>();

  // ##### COMPUTED
  classes = computed(() => {
    const color = this.color();
    const level = this.level();

    let classes = `bg-white w-full rounded-md border border-stroke outline-none transition py-[10px]`;

    const hasIcon = this.icon();
    const iconPos = this.iconPosition();
    const isPassword = this.type() === "password";

    if (isPassword) {
      if (hasIcon) classes += ` pl-12 pr-12`;
      else classes += ` pl-3 pr-12`;
    } else {
      if (hasIcon) classes += iconPos === "left" ? ` pl-12 pr-3` : ` pl-3 pr-12`;
      else classes += ` pl-3 pr-3`;
    }

    classes += ` focus:border-gb-${color}-${level}`;
    if ((this.regex() || this.min() || this.max()) && this.model()) {
      if (!this.isValid()) classes += " focus:border-gb-error-500 border-gb-error-500";
    }
    if (this.required() && !this.model() && this.focused()) {
      classes += " focus:border-gb-error-500 border-gb-error-500";
    }
    if (this.disabled()) {
      classes = classes.replace("bg-white", "bg-gb-gray-light-500");
      classes += " text-gb-gray-dark-500";
    }
    if (this.forceError().force()) classes += " border-gb-error-500 border-gb-error-500";
    classes += ` ${this.extraClasses()}`;
    return classes;
  });

  iconClass = computed(() => {
    return `absolute ${this.iconPosition()}-4 top-1/2 -translate-y-1/2`;
  });
  public toggleCleanView = () => {
    this.model.set("");
  };

  isValid() {
    const min = this.min();
    const max = this.max();
    if (min != undefined && parseFloat(this.model()) < min) return false;
    if (max != undefined && parseFloat(this.model()) > max) return false;
    const regex = this.regex();
    const regexArray = Array.isArray(regex) ? regex : [regex];
    if (regex) return this.validateRegex(regexArray);
    return true;
  }
  validateRegex(rgx: RegExp | RegExp[], index?: number) {
    let r = Array.isArray(rgx) ? rgx : [rgx];
    if (typeof index !== "undefined") r = [r[index]];
    for (let rx of r) {
      if (!(rx instanceof RegExp)) return false;
      if (!rx.test(`${this.model().trim()}`)) return false;
    }
    return true;
  }

  setMask() {
    if (this.type() === "money") {
      return "separator.2";
    }
    if (this.type() === "phone") {
      return "0000-0000";
    }
    return "";
  }

  // ##### LC HOOKS
  ngOnInit(): void {
    this.model.update(() => this.value());
    this.inType.update(() => this.type());
    this.valueLoaded.set(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !changes['value'].isFirstChange()) {
      this.model.set(this.value());
      this.valueLoaded.set(true);
    }
  }
}
