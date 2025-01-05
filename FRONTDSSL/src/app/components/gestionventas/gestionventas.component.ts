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
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categorias: Categoria[]= [];
  selectedCategoria: number = 0;  // Categoria seleccionada por el usuario
  nombreBusqueda: string = '';  // Campo para búsqueda por nombre

  constructor(private productoService: ProductoService,private categoriaService: CategoriaService){
      
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(){
    this.productoService.getProducts().subscribe(
      (response) => {
        this.productos = response;
        this.productosFiltrados = response; // Inicialmente, mostramos todos los productos
      },(error) => console.error('Error al cargar productos', error));
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

 // Al cambiar la categoría en el combo box
 onCategoriaChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const selectedCategoriaId = Number(target.value);
  this.selectedCategoria = selectedCategoriaId;
  this.applyFilters();  // Aplicar ambos filtros (nombre y categoría)
}

// Al cambiar el nombre en el campo de búsqueda
onNombreChange(event: Event): void {
  this.nombreBusqueda = (event.target as HTMLInputElement).value;
  this.applyFilters();  // Aplicar ambos filtros (nombre y categoría)
}

// Filtrar productos por nombre y categoría seleccionada
applyFilters(): void {
  let productosFiltrados = this.productos;

  // Filtrar por nombre
  if (this.nombreBusqueda.trim()) {
    productosFiltrados = productosFiltrados.filter(producto =>
      producto.nombre.toLowerCase().includes(this.nombreBusqueda.toLowerCase())
    );
  }

  // Filtrar por categoría
  if (this.selectedCategoria !== 0) {
    productosFiltrados = productosFiltrados.filter(producto =>
      producto.id_categoria === this.selectedCategoria
    );
  }

  // Actualizar la lista de productos filtrados
  this.productosFiltrados = productosFiltrados;
}
}
