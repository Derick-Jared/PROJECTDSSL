import { Component, OnInit } from '@angular/core';
import { Venta } from 'src/app/models/VentaModel';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-gestionreporte',
  templateUrl: './gestionreporte.component.html',
  styleUrls: ['./gestionreporte.component.css']
})
export class GestionreporteComponent implements OnInit{
  ventas:Venta[]=[];

  constructor(private ventaService :VentaService ){
  }

  ngOnInit(): void {
    this.loadVentas();
  } 

  loadVentas(){
    this.ventaService.getVentas().subscribe(
      (response) => this.ventas = response,
      (error) => console.error("Error al cargar las categorias", error)
    )
  }
}
