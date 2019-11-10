import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleCComponent } from './sample-c.component';

describe('SampleCComponent', () => {
  let component: SampleCComponent;
  let fixture: ComponentFixture<SampleCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
