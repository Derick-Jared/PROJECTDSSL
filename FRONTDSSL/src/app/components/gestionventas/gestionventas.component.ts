import { Component } from '@angular/core';
import { Categoria } from 'src/app/models/CategoriaModel';
import { Persona } from 'src/app/models/PersonaModel';
import { Producto } from 'src/app/models/ProductoModel';
import { CategoriaService } from 'src/app/services/categoria.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-gestionventas',
  templateUrl: './gestionventas.component.html',
  styleUrls: ['./gestionventas.component.css']
})
export class GestionventasComponent {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  clientes:Persona[] = [];
  clientesFiltrados: Persona[] = [];
  categorias: Categoria[]= [];
  selectedCategoria: number = 0;  // Categoria seleccionada por el usuario
  nombreBusqueda: string = '';  // Campo para búsqueda por nombre
  dniBusqueda: string = ''; 
  carrito: any[] = [];
  productoSeleccionado: Producto | null = null;
  productoSeleccionadoIndex: number | null = null;  // Índice del producto seleccionado en el carrito
  montoPago: number = 0;
  fechaActual: string;

  constructor(private productoService: ProductoService,private categoriaService: CategoriaService,private personaService: PersonaService){
    const hoy = new Date();
    // Obtener la fecha en formato 'YYYY-MM-DD'
    const año = hoy.getFullYear();
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0'); // Mes de 0-11, sumamos 1
    const dia = hoy.getDate().toString().padStart(2, '0'); // Día
    this.fechaActual = `${año}-${mes}-${dia}`;
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

  loadPersons(): void {
    this.personaService.getPersons().subscribe(
      (data) => {
        this.clientes = data;
        this.clientesFiltrados = data; // Inicialmente mostramos todos los clientes
      },
      (error) => console.error('Error al cargar los clientes:', error)
    );
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

onClienteChange(event: Event): void {
  this.dniBusqueda = (event.target as HTMLInputElement).value;
  this.applyFilters();  // Aplicar ambos filtros (nombre y categoría)
}

// Filtrar productos por nombre y categoría seleccionada
applyFilters(): void {
  let productosFiltrados = this.productos;
  let clientesFiltrados = this.clientes;

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

  // Filtrar por DNI
  if (this.dniBusqueda.trim()) {
    clientesFiltrados = clientesFiltrados.filter(cliente =>
      cliente.dni.toLowerCase().includes(this.dniBusqueda.toLowerCase())
    );
  }

  // Actualizar la lista de productos filtrados
  this.productosFiltrados = productosFiltrados;

  // Actualizar la lista de clientes filtrados
  this.clientesFiltrados = clientesFiltrados;
  }

  seleccionarProducto(producto: Producto): void {
    this.productoSeleccionado = producto;
  }

  // Método para agregar productos al carrito
  agregarAlCarrito(): void {
    if (!this.productoSeleccionado) {
      alert('Por favor, seleccione un producto antes de agregarlo al carrito.');
      return;
    }

    const cantidadStr = prompt(
      `Ingrese la cantidad para "${this.productoSeleccionado.nombre}" (Stock disponible: ${this.productoSeleccionado.stock}):`
    );
    if (!cantidadStr) return;

    const cantidad = Number(cantidadStr);

    if (
      isNaN(cantidad) ||
      cantidad <= 0 ||
      cantidad > this.productoSeleccionado.stock
    ) {
      alert('Cantidad inválida o superior al stock disponible.');
      return;
    }

    // Disminuir el stock del producto
    this.productoSeleccionado.stock -= cantidad;

    const total = this.productoSeleccionado.precio * cantidad;
    const index = this.carrito.findIndex(
      (item) => item.producto.id === this.productoSeleccionado!.id
    );

    if (index !== -1) {
      this.carrito[index].cantidad += cantidad;
      this.carrito[index].total += total;
    } else {
      this.carrito.push({
        producto: this.productoSeleccionado,
        cantidad,
        total,
      });
    }

    this.productoSeleccionado = null; // Limpiar selección después de agregar
  }

  // Método para seleccionar un producto en el carrito
  seleccionarProductoCarrito(index: number): void {
    console.log("FILA SELECCIONADA:"+index);
    this.productoSeleccionadoIndex = index;
  }

  getTotalCarrito(): number {
    return this.carrito.reduce((total, item) => total + item.total, 0);
  }

  getVuelto(): number {
    const total = this.getTotalCarrito();  // Total del carrito
    return this.montoPago - total;         // Calcula el vuelto
  }

  procesarPago(): void {
    const total = this.getTotalCarrito();
    if (this.montoPago < total) {
      alert('El monto de pago es insuficiente.');
    } else {
      // Aquí puedes agregar la lógica para completar el pago
      alert('Pago procesado correctamente.');
    }
  }

  // Método para eliminar el producto seleccionado en el carrito
  eliminarProducto(): void {
    if (this.productoSeleccionadoIndex === null) return; // No hacer nada si no hay producto seleccionado
    
    
      if (!confirm('¿Estás seguro de eliminar este producto del carrito?')) {
        return; // Si el usuario cancela la acción, no eliminar
      }
    
      const productoEliminado = this.carrito[this.productoSeleccionadoIndex];
      const productoInventario = this.productos.find(p => p.id === productoEliminado.producto.id);
      
      // Restaurar el stock del producto en inventario
      if (productoInventario) {
        productoInventario.stock += productoEliminado.cantidad;
      }
    
      // Eliminar el producto del carrito
      this.carrito.splice(this.productoSeleccionadoIndex, 1);
    
      // Resetear la selección
      this.productoSeleccionadoIndex = null;
      }
    
      
    
}
