import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/UsuarioModel';
import { Persona } from 'src/app/models/PersonaModel';
import { PersonaService } from 'src/app/services/persona.service';


@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  personaForm!: FormGroup;
  userForm!: FormGroup;
  submited = false;
  user: Usuario | undefined;
  persona: Persona | undefined;
  isEditMode = false;

  constructor(private personaService: PersonaService, private fb: FormBuilder) {
    this.personaForm = this.fb.group({
      dni: [''],
      nombres: [''],
      apellidos: [''],
      direccion: [''],
      email: [''],
      telefono: [''],
    })

    this.userForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      // tipo_documento: [this.persona?.tipo_documento || '', Validators.required],
      // cedula: [this.persona?.cedula || '', [Validators.required]],
      // nombres: [this.persona?.nombres || '',],
      // apellidos: [this.persona?.apellidos || '',],
      // razon_social: [this.persona?.razon_social || '',],
      // email: [this.persona?.email || '', [Validators.required]],
      // direccion: [this.persona?.direccion || ''],
      // telefono: [this.persona?.telefono || ''],
      // password: [this.user?.password || '', [Validators.required]]
    })
  }



}
