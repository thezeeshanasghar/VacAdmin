import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CityAlertPage } from './cityalert.page';

describe('CityAlertPage', () => {
  let component: CityAlertPage;
  let fixture: ComponentFixture<CityAlertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityAlertPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CityAlertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
