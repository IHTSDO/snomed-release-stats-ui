import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralReleaseStatisticsComponent } from './general-release-statistics.component';

describe('GeneralReleaseStatisticsComponent', () => {
  let component: GeneralReleaseStatisticsComponent;
  let fixture: ComponentFixture<GeneralReleaseStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralReleaseStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralReleaseStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
