import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionregistroComponent } from "./components/gestionregistro/gestionregistro.component";
import { GestionventasComponent } from './components/gestionventas/gestionventas.component';

import { GestioncategoriaComponent } from './components/gestioncategoria/gestioncategoria.component';
import { IndexComponent } from './components/index/index.component';


const routes: Routes = [
    {path:'gestionregistro',component:GestionregistroComponent},
    {path:'gestioncategoria', component: GestioncategoriaComponent },
    {path:'gestionventas',component:GestionventasComponent}, //NOMBRE A LLAMAR EN LA URL
    {path:'index',component:IndexComponent},
    {path:'',redirectTo:'/index',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
