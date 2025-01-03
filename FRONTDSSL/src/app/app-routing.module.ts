import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionregistroComponent } from "./components/gestionregistro/gestionregistro.component";

const routes: Routes = [
    {path:'gestionregistro',component:GestionregistroComponent}, //NOMBRE A LLAMAR EN LA URL
    {path:'',redirectTo:'/gestionregistro',pathMatch:'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
