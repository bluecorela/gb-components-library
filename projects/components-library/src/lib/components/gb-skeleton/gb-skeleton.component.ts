import { Component, computed, input } from '@angular/core';
import { IonSkeletonText } from '@ionic/angular/standalone';

@Component({
  selector: 'gb-skeleton',
  templateUrl: './gb-skeleton.component.html',
  styleUrl: './gb-skeleton.component.scss',
  imports: [IonSkeletonText]
})
export class GbSkeletonComponent {
  extraClass = input('');
  class = computed(() => `bg-gb-gray-light-600 ${this.extraClass()}`);
}
