import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptiveStatisticsComponent } from './descriptive-statistics.component';

describe('DescriptiveStatisticsComponent', () => {
  let component: DescriptiveStatisticsComponent;
  let fixture: ComponentFixture<DescriptiveStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptiveStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptiveStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
