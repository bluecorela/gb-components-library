import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'gb-badge',
  imports: [],
  templateUrl: './gb-badge.component.html',
  styleUrl: './gb-badge.component.scss'
})
export class GbBadgeComponent {
  badgeText = input<string>('Placeholder');
  badgeType =  input<'solid' | 'outline'>('solid');

  bgColor = input<string>('bg-gb-cyan-200');
  textColor = input<string>('text-gb-cyan-600');
  borderColor = input<string>('border-gb-cyan-600');

  borderClass = computed(() => this.badgeType() === 'outline' ? `border ${this.borderColor()}` :'border-0')
}
