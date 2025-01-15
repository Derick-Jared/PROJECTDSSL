import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/models/ProductoModel';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/alertify.service';

@Component({
  selector: 'app-gestioninventario',
  templateUrl: './gestioninventario.component.html',
  styleUrls: ['./gestioninventario.component.css']
})
export class GestioninventarioComponent implements OnInit{
  @ViewChild('productoModal') productoModal?: ProductoFormComponent;
  productos:Producto[]=[];
  productoForm:FormGroup;
  constructor(private productoService: ProductoService,private fb: FormBuilder, private modalService: NgbModal, private router: Router, private alertify: AlertifyService){
    this.productoForm = this.fb.group({
      id: [''],
      nombre: [''],
      precio: [''],
      stock: [''],
      id_categoria: ['']
    })
  }

  ngOnInit(): void {
    this.loadProductos();
  } 

  loadProductos(){
    this.productoService.getProducts().subscribe(
      (response) => this.productos = response,
      (error) => console.error("Error al cargar las categorias", error)
    )
  }

  openModalProducto(producto?: Producto) {
        const modalRef = this.modalService.open(ProductoFormComponent);
        console.log(producto);
        if (producto) {
          modalRef.componentInstance.producto = producto;
          modalRef.componentInstance.isEditMode = true;
        }
    
        modalRef.result.then((result) => {
          if (result) {
            if (result.id) {
              this.productoService.updateProducto(result.id, result).subscribe({
                next: () => {
                  this.loadProductos(); // this.loadPersons()
                  this.alertify.success('¡Categoria Actualizado!');
                },
                error: (err) => {
                  console.error('Error al actualizar cliente:', err);
                  this.alertify.error('Ocurrió un error al actualizar la categoria.');
                },
              });
            } else {
              this.productoService.createProducto(result).subscribe({
                next: () => {
                  this.loadProductos(); // this.loadPersons()
                  this.alertify.success('¡Categoria Agregado!');
                },
                error: (err) => {
                  console.error('Error al agregar cliente:', err);
                  this.alertify.error('Ocurrió un error al agregar la categoria..');
                },
              });
            }
            this.productoForm.reset();
          }
        });
  }

  resetForm() {
    this.productoForm.reset();
  }

  deleteProducto(id: number) {
    this.alertify.confirm2(
      '¿Estás seguro de que deseas eliminar este producto?',
      () => {
        this.productoService.deleteProducto(id).subscribe(() => {
          this.loadProductos();
          this.alertify.error('¡Producto Eliminado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Eliminar Producto',
      }
    );
  }

  restoreProducto(id: number) {
    this.alertify.confirm2(
      '¿Estas seguro de habilitar el registro?',
      () => {
        this.productoService.restoreProducto(id).subscribe(() => {
          this.loadProductos();
          this.alertify.success('¡Producto Habilitado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Habilitar Producto',
      }
    );
  }
}
