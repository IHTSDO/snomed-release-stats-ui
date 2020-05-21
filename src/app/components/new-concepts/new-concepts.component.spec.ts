import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConceptsComponent } from './new-concepts.component';

describe('NewConceptsComponent', () => {
  let component: NewConceptsComponent;
  let fixture: ComponentFixture<NewConceptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConceptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
