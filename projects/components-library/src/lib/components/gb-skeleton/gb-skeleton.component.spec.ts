import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GbSkeletonComponent } from './gb-skeleton.component';

describe('GbSkeletonComponent', () => {
  let component: GbSkeletonComponent;
  let fixture: ComponentFixture<GbSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GbSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize class with the correct base value', () => {
    expect(component.class()).toBe('bg-gb-gray-light-600 ');
  });
});
