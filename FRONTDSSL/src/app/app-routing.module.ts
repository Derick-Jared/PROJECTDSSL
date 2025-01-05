import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionregistroComponent } from "./components/gestionregistro/gestionregistro.component";
import { GestionventasComponent } from './components/gestionventas/gestionventas.component';

const routes: Routes = [
    {path:'gestionregistro',component:GestionregistroComponent}, //NOMBRE A LLAMAR EN LA URL
    {path:'',redirectTo:'/gestionregistro',pathMatch:'full'},
    {path:'gestionventas',component:GestionventasComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
