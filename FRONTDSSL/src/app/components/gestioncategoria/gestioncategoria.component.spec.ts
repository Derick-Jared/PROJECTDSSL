import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioncategoriaComponent } from './gestioncategoria.component';

describe('GestioncategoriaComponent', () => {
  let component: GestioncategoriaComponent;
  let fixture: ComponentFixture<GestioncategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioncategoriaComponent]
    });
    fixture = TestBed.createComponent(GestioncategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
