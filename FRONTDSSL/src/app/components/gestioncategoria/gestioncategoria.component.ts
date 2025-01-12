import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from 'src/app/models/CategoriaModel';

import { CategoriaproductoService } from 'src/app/services/categoriaproducto.service';
import { CategoriaFormComponent } from '../gestioncategoria/categoria-form/categoria-form.component'


@Component({
  selector: 'app-gestioncategoria',
  templateUrl: './gestioncategoria.component.html',
  styleUrls: ['./gestioncategoria.component.css']
})
export class GestioncategoriaComponent implements OnInit {
  @ViewChild('categoriaModal') categoriaModal?: CategoriaFormComponent;
  categorias: Categoria [] = [];
  categoriaForm: FormGroup;
  currentUserId?: number;
  editMode: boolean = false;

  constructor(private categoriaproductoService :CategoriaproductoService , private fb: FormBuilder, private modalService: NgbModal){
    this.categoriaForm = this.fb.group({
      id: [''],
      nombre: [''],
    })
  }

  ngOnInit(): void {
    this.loadCategorias();
  } 


  loadCategorias(){
    this.categoriaproductoService.getCategorias().subscribe(
      (response) => this.categorias = response,
      (error) => console.error("Error al cargar las categorias", error)
    )
  }

  openModalCategoria(cliente?: Categoria) {
      const modalRef = this.modalService.open(CategoriaFormComponent);
      if (cliente) {
        modalRef.componentInstance.categoria = cliente;
        modalRef.componentInstance.isEditMode = true;
      }
  
      modalRef.result.then((result) => {
        if (result) {
          if (result.id) {
            this.categoriaproductoService.updateCategoria(result.id, result).subscribe(() => {
              this.loadCategorias()
            });
          } else {
            this.categoriaproductoService.createCategoria(result).subscribe(() => {
              this.loadCategorias();
            });
          }
        }
  
      })
    }
  
    onSubmit() {
      console.log("onSubmit", this.categoriaForm.value);
      if (this.editMode && this.currentUserId) {
        console.log("Entro aca?");
        this.categoriaproductoService.updateCategoria(this.currentUserId, this.categoriaForm.value).subscribe(() => {
          this.loadCategorias()
          this.resetForm();
        })
      } else {
        this.categoriaproductoService.createCategoria(this.categoriaForm.value).subscribe(() => {
          this.loadCategorias();
          this.resetForm();
        })
      }
    }
  
  
    resetForm() {
      this.categoriaForm.reset();
    }
  
    deleteCategoria(id:number){
      const confirmacion = confirm("¿Estas seguro de eliminar el registro?");
      if (confirmacion) {
        this.categoriaproductoService.deleteCategoria(id).subscribe(() => {
          this.loadCategorias();
        })
      }
    }

}
