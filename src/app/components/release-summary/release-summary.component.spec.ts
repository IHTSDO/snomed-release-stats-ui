import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseSummaryComponent } from './release-summary.component';

describe('ReleaseSummaryComponent', () => {
  let component: ReleaseSummaryComponent;
  let fixture: ComponentFixture<ReleaseSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
