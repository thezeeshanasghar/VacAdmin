import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnapprovedPage } from './unapproved.page';

describe('UnapprovedPage', () => {
  let component: UnapprovedPage;
  let fixture: ComponentFixture<UnapprovedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnapprovedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnapprovedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
