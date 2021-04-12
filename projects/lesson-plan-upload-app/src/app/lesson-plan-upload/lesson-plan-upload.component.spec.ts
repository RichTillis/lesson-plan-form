import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPlanUploadComponent } from './lesson-plan-upload.component';

describe('LessonPlanUploadComponent', () => {
  let component: LessonPlanUploadComponent;
  let fixture: ComponentFixture<LessonPlanUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonPlanUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonPlanUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
