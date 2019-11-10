import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleDComponent } from './sample-d.component';

describe('SampleDComponent', () => {
  let component: SampleDComponent;
  let fixture: ComponentFixture<SampleDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
