import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptChangesPercentagesComponent } from './concept-changes-percentages.component';

describe('ConceptChangesPercentagesComponent', () => {
  let component: ConceptChangesPercentagesComponent;
  let fixture: ComponentFixture<ConceptChangesPercentagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptChangesPercentagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptChangesPercentagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
