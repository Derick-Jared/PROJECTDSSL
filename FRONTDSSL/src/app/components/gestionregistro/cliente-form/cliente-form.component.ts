import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from'src/app/models/PersonaModel';
import { PersonaServiceService } from'src/app/services/persona-service.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})

export class ClienteFormComponent implements OnInit {
  clienteForm!: FormGroup;
  submited = false;
  cliente: Persona | undefined;
  isEditMode =false;
  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      id: [this.cliente?.id],
      dni: [this.cliente?.dni || '', [Validators.required, Validators.pattern('[0-9]{8}[A-Z]')]],
      nombres: [this.cliente?.nombres || '', Validators.required],
      apellidos: [this.cliente?.apellidos || '', Validators.required],
      direccion: [this.cliente?.direccion || '', Validators.required],
      telefono: [this.cliente?.telefono || '', [Validators.required, Validators.pattern('[0-9]{9}')]],
      email: [this.cliente?.email || '', [Validators.required, Validators.email]],
    })
  }

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.clienteForm = this.fb.group({
        dni: [''],
        nombres: [''],
        apellidos: [''],
        direccion: [''],
        telefono: [''],
        email: ['']
    })
  }

  onSubmit() {
    this.submited = true;
    if(this.clienteForm.valid){
      this.activeModal.close(this.clienteForm.value);
    }
  }

}
