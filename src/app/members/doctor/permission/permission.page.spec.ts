import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionPage } from './permission.page';

describe('PermissionPage', () => {
  let component: PermissionPage;
  let fixture: ComponentFixture<PermissionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
