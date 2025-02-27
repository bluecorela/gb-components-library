// ##### IONIC & ANGULAR
import {
  Component,
  input,
  output,
  signal,
  OnInit,
  effect,
  computed,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';

@Component({
  selector: 'gb-input',
  templateUrl: './gb-input.component.html',
  styleUrls: ['./gb-input.component.scss'],
  imports: [FormsModule, IonIcon],
})
export class GbInputComponent implements OnInit {
  constructor() {
    addIcons(icons);
    // ##### EFFECTS
    effect(() => {
      this.valueChange.emit(this.model());
    });
  }
  // ##### INPUTS
  type = input<'text' | 'password' | 'email' | 'number'>('text');
  label = input('')
  errHint = input('')
  okHint = input('')
  placeholder = input('');
  value = input.required<string>();
  color = input('blue');
  level = input(500);
  icon = input<string>();
  disabled = input(false);
  extraClasses = input('');
  passwordToggle = input(false);
  regex = input<string>();
  required = input(false);
  min = input<number>();
  max = input<number>();
  identity = input('');

  // ##### SIGNALS
  model = signal<string>('');
  isShowingPassword = signal(false);
  inType = signal('');
  focused = signal(false);

  // ##### METHODS
  togglePass() {
    this.isShowingPassword.update(val => (val = !val));
    if (this.isShowingPassword()) this.inType.update(val => (val = 'text'));
    else this.inType.update(val => (val = 'password'));
  }

  wasFocused() {
    this.focused.update(val => (val = true));
  }

  // OUTPUTS
  valueChange = output<string | number>();

  // ##### COMPUTED
  classes = computed(() => {
    const color = this.color();
    const level = this.level();
    let classes = `w-full rounded-md border border-stroke outline-none transition py-[10px] pr-3`;
    if (this.icon()) classes += ` pl-12`;
    else classes += ` pl-3`;
    classes += ` focus:border-gb-${color}-${level}`;
    if ((this.regex() || this.min() || this.max()) && this.model()) {
      if (this.isValid())
        classes += ' focus:border-gb-success-500 border-gb-success-500';
      else classes += ' focus:border-gb-error-500 border-gb-error-500';
    }
    if (this.required() && !this.model() && this.focused()) {
      classes += ' focus:border-gb-error-500 border-gb-error-500';
    }
    if (this.disabled()) classes += ' bg-gray-2';
    classes += ` ${this.extraClasses()}`;
    return classes;
  });

  isValid() {
    const regex = this.regex();
    const min = this.min();
    const max = this.max();
    if (regex) {
      const reg = new RegExp(regex);
      return reg.test(`${this.model()}`);
    }
    if (min != undefined && parseFloat(this.model()) < min) return false;
    if (max != undefined && parseFloat(this.model()) > max) return false;
    return true;
  }

  // ##### LC HOOKS
  ngOnInit(): void {
    this.model.update(val => (val = this.value()));
    this.inType.update(val => (val = this.type()));
  }
}
