import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/ProductoModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css'],
})
export class ProductoFormComponent implements OnInit {
  productoForm!: FormGroup;
  submited = false;
  producto: Producto | undefined;
  isEditMode = false;

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      id: [this.producto?.id],
      nombre: [this.producto?.nombre || '', Validators.required],
      precio: [this.producto?.precio || '', Validators.required],
      stock: [this.producto?.stock || '', Validators.required],
      estado: '1',
      id_categoria: 1,
    });
  }

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.productoForm = this.fb.group({
      nombre: [''],
      precio: [''],
      stock: [''],
    });
  }

  onSubmit() {
    console.log("viene");
    this.submited = true;
    if(this.productoForm.valid){
      console.log("luego entra");
      this.activeModal.close(this.productoForm.value);
    }
  }
}
