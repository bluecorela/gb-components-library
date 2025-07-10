import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GbSegmentComponent } from "./gb-segment.component";

describe("GbBadgeComponent", () => {
  let fixture: ComponentFixture<GbSegmentComponent>;
  let component: GbSegmentComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbSegmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GbSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
