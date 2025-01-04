import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionregistroComponent } from './gestionregistro.component';

describe('GestionregistroComponent', () => {
  let component: GestionregistroComponent;
  let fixture: ComponentFixture<GestionregistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionregistroComponent]
    });
    fixture = TestBed.createComponent(GestionregistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
