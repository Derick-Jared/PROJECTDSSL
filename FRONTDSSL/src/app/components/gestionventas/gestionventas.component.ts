import { Component } from '@angular/core';
import { Categoria } from 'src/app/models/CategoriaModel';
import { Producto } from 'src/app/models/ProductoModel';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-gestionventas',
  templateUrl: './gestionventas.component.html',
  styleUrls: ['./gestionventas.component.css']
})
export class GestionventasComponent {
  productos: any[] = [];
  categorias: Categoria[]= [];
  selectedCategoria: number = 0; 

  constructor(private productoService: ProductoService,private categoriaService: CategoriaService){
      
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(){
    this.productoService.getProducts().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response)=>this.productos=response,
      (error)=>console.error("error en el loading product",error)
    )
  }

  loadCategories(){
    this.categoriaService.getCategories().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response)=>this.categorias=response,
      (error)=>console.error("error en el loading product",error)
    )
  }

  getCategoriaNombre(id_categoria: number): string {
    const cat = this.categorias.find(c => c.id === id_categoria);
    return cat ? cat.nombre : 'Sin Categoria';
  }

  onCategoriaChange(event: Event): void {
    const target = event.target as HTMLSelectElement; // Obtén el elemento del evento
    this.selectedCategoria = Number(target.value); // Convierte el valor seleccionado a número
  
    if (this.selectedCategoria === 0) {
      this.loadProducts(); // Cargar todos los productos
    } else {
      this.productoService.getProductsByIdCategory(this.selectedCategoria).subscribe(
        (response) => {
          this.productos = response;
        },
        (error) => console.error('Error al cargar productos por categoría:', error)
      );
    }
  }
}
