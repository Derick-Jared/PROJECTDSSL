import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GestionregistroComponent } from './components/gestionregistro/gestionregistro.component';

import { HttpClientModule } from '@angular/common/http';
import { ClienteFormComponent } from './components/gestionregistro/cliente-form/cliente-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GestionventasComponent } from './components/gestionventas/gestionventas.component';

@NgModule({
  declarations: [
    AppComponent,
    GestionregistroComponent,
    ClienteFormComponent,
    GestionventasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
