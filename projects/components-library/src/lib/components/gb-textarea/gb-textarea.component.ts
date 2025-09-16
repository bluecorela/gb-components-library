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

@Component({
  selector: "gb-textarea",
  templateUrl: "./gb-textarea.component.html",
  styleUrls: ["./gb-textarea.component.scss"],
  imports: [FormsModule],
})
export class GbTextAreaComponent implements OnInit, OnChanges {
  constructor() {
    // ##### EFFECTS
    effect(
      () => {
        if (this.model() !== this.value() && this.valueLoaded()) {
          this.valueChange.emit(this.model());
        }
      },
      { allowSignalWrites: true },
    );
  }

  // ##### VIEW CHILDS
  @ViewChild("gbTextArea") inputElement!: ElementRef<HTMLTextAreaElement>;

  // ##### INJECTS
  elRef = inject(ElementRef);

  @HostListener("document:click", ["$event"])
  onClickOutside(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.inputElement.nativeElement.blur();
    }
  }

  // ##### INPUTS
  autocapitalize = input<"off" | "none" | "sentences" | "on" | "words" | "characters">("off");
  label = input("");
  errHint = input("");
  okHint = input("");
  placeholder = input("");
  value = input.required<string>();
  color = input("blue");
  level = input(500);
  disabled = input(false);
  extraClasses = input("");
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

  // ##### SIGNALS
  model = signal<string>("");
  inType = signal("");
  focused = signal(false);
  isFocus = signal(false);
  valueLoaded = signal(false);

  // ##### METHODS
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

    let classes = `bg-white w-full rounded-md border border-stroke outline-none transition px-5 py-[10px]`;

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

  // ##### LC HOOKS
  ngOnInit(): void {
    this.model.update(() => this.value());
    this.valueLoaded.set(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["value"] && !changes["value"].isFirstChange()) {
      this.model.set(this.value());
      this.valueLoaded.set(true);
    }
  }
}
