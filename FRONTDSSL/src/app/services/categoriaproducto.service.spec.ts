import { TestBed } from '@angular/core/testing';

import { CategoriaproductoService } from './categoriaproducto.service';

describe('CategoriaproductoService', () => {
  let service: CategoriaproductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaproductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
