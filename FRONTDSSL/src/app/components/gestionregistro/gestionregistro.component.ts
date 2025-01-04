import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/UsuarioModel';
import { TipoUsuario } from 'src/app/models/TipoUsuarioModel';
import { Persona } from 'src/app/models/PersonaModel';
import { PersonaServiceService } from 'src/app/services/persona-service.service';
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
  currentUserId?: number;
  editMode: boolean = false;
  constructor(private personaServiceService: PersonaServiceService, private fb: FormBuilder,private modalService: NgbModal){
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
    this.loadPersons();
  }


  loadPersons(){
    this.personaServiceService.getPersons().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response)=>this.personas=response,
      (error)=>console.error("error en el loading",error)
    )

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
          this.personaServiceService.updatePerson(result.id, result).subscribe(() => {
            this.loadPersons()              
          });
        }else{
          this.personaServiceService.createPerson(result).subscribe(() => {
            this.loadPersons();            
          });
        }
      }

    })
  }

  onSubmit() {
    console.log("onSubmit", this.clienteForm.value);
    if (this.editMode && this.currentUserId) {
      this.personaServiceService.updatePerson(this.currentUserId, this.clienteForm.value).subscribe(() => {
        this.loadPersons()
        this.resetForm();
        })
    }else {
      this.personaServiceService.createPerson(this.clienteForm.value).subscribe(() => {
        this.loadPersons();
        this.resetForm();
      })
    }
  }


  resetForm() {
    this.clienteForm.reset();
  }
}
