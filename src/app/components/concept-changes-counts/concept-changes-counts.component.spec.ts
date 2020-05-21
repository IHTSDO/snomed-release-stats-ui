import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptChangesCountsComponent } from './concept-changes-counts.component';

describe('ConceptChangesCountsComponent', () => {
  let component: ConceptChangesCountsComponent;
  let fixture: ComponentFixture<ConceptChangesCountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptChangesCountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptChangesCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
