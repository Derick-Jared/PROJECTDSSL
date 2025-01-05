import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GestionregistroComponent } from './components/gestionregistro/gestionregistro.component';

import { HttpClientModule } from '@angular/common/http';
import { ClienteFormComponent } from './components/gestionregistro/cliente-form/cliente-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GestioncategoriaComponent } from './components/gestioncategoria/gestioncategoria.component';
import { CategoriaFormComponent } from './components/gestioncategoria/categoria-form/categoria-form.component';

@NgModule({
  declarations: [
    AppComponent,
    GestionregistroComponent,
    ClienteFormComponent,
    GestioncategoriaComponent,
    CategoriaFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
