import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivatedConceptsComponent } from './inactivated-concepts.component';

describe('InactivatedConceptsComponent', () => {
  let component: InactivatedConceptsComponent;
  let fixture: ComponentFixture<InactivatedConceptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactivatedConceptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactivatedConceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
