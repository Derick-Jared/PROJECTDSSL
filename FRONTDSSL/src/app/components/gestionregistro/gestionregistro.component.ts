import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/UsuarioModel';
import { TipoUsuario } from 'src/app/models/TipoUsuarioModel';
import { Persona } from 'src/app/models/PersonaModel';
import { PersonaService } from 'src/app/services/persona.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteFormComponent} from '../gestionregistro/cliente-form/cliente-form.component'

@Component({
  selector: 'app-gestionregistro',
  templateUrl: './gestionregistro.component.html',
  styleUrls: ['./gestionregistro.component.css']
})
export class GestionregistroComponent implements OnInit {
  @ViewChild('clienteModal') clienteModal?: ClienteFormComponent;
  personas: Persona[]= [];
  clienteForm: FormGroup;
  clientes: any[] = [];
  currentUserId?: number;
  editMode: boolean = false;
  constructor(private personaService: PersonaService, private fb: FormBuilder,private modalService: NgbModal){
    this.clienteForm = this.fb.group({
      id: [''],
      dni: [''],
      nombres: [''],
      apellidos: [''],
      direccion: [''],
      telefono: [''],
      email: ['']
    })
  }

  ngOnInit(): void {
    //this.loadPersons();
    this.loadClientes();
  }

/*
  loadPersons(){
    this.personaService.getPersons().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response)=>this.personas=response,
      (error)=>console.error("error en el loading",error)
    )
  }
    */

  loadClientes(): void {
    this.personaService.getClients().subscribe((data) => {
      this.clientes = data;
    });
  }

  openModalCliente(persona?: Persona){
    const modalRef = this.modalService.open(ClienteFormComponent);
    if(persona){
      modalRef.componentInstance.persona = {...persona};
      modalRef.componentInstance.isEditMode = true;
    }

    modalRef.result.then((result)=>{
      if(result){
        if(result.id){
          this.personaService.updatePerson(result.id, result).subscribe(() => {
            this.loadClientes(); //     this.loadPersons()         
          });
        }else{
          this.personaService.createPerson(result).subscribe(() => {
            this.loadClientes();    //     this.loadPersons()         
          });
        }
      }

    })
  }

  onSubmit() {
    console.log("onSubmit", this.clienteForm.value);
    if (this.editMode && this.currentUserId) {
      this.personaService.updatePerson(this.currentUserId, this.clienteForm.value).subscribe(() => {
        this.loadClientes(); //     this.loadPersons() 
        this.resetForm();
        })
    }else {
      this.personaService.createPerson(this.clienteForm.value).subscribe(() => {
        this.loadClientes(); //     this.loadPersons() 
        this.resetForm();
      })
    }
  }


  resetForm() {
    this.clienteForm.reset();
  }
}
