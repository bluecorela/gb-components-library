import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GbDropdownBtnComponent } from "./gb-dropdown-btn.component";

describe("GbDropdownBtnComponent", () => {
  let component: GbDropdownBtnComponent;
  let fixture: ComponentFixture<GbDropdownBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GbDropdownBtnComponent],
      providers: [{}],
    }).compileComponents();
    fixture = TestBed.createComponent(GbDropdownBtnComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });
});
