import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoForm2Component } from './photo-form2.component';

describe('PhotoForm2Component', () => {
  let component: PhotoForm2Component;
  let fixture: ComponentFixture<PhotoForm2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoForm2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
