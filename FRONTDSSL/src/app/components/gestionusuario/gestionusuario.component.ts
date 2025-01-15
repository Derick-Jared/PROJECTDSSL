import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/PersonaModel';
import { Usuario } from 'src/app/models/UsuarioModel';
import { TipoUsuario } from 'src/app/models/TipoUsuarioModel';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { AlertifyService } from 'src/app/core/alertify.service';

@Component({
  selector: 'app-gestionusuario',
  templateUrl: './gestionusuario.component.html',
  styleUrls: ['./gestionusuario.component.css']
})
export class GestionusuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  tipoUsuarios: TipoUsuario[] = [];
  personas: Persona[] = [];
  usuariosCombinados: any[] = []; // Nuevo array para almacenar los datos combinados
  usuariosCombinados2: any[] = [];
  constructor(
    private usuarioService: UsuarioService,
    private personaService: PersonaService,
    private tipoUsuarioService: TipoUsuarioService,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.loadUsuarios();
    this.loadPersons();
    this.loadTipoUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.getUsers().subscribe(
      (response) => {
        this.usuarios = response;
        this.combineData(); // Combina los datos después de cargar los usuarios
        this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }

  loadTipoUsuarios(): void {
    this.tipoUsuarioService.getTiposUsers().subscribe(
      (response) => {
        this.tipoUsuarios = response;
        this.combineData(); // Combina los datos después de cargar los tipos de usuario
        this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }

  loadPersons(): void {
    this.personaService.getPersons().subscribe(
      (response) => {
        this.personas = response;
        this.combineData(); // Combina los datos después de cargar las personas
        this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }

  combineData(): void {
    if (this.usuarios.length > 0 && this.personas.length > 0 && this.tipoUsuarios.length > 0) {
      this.usuariosCombinados = this.usuarios.filter(usuario => {
        const persona = this.personas.find(p => p.id === usuario.id_persona);
        const tipoUsuario = this.tipoUsuarios.find(tu => tu.id === usuario.id_tipousuario);

        // Verifica si los tres registros tienen estado "0"
        return usuario.estado === '1' && persona?.estado === '1' && tipoUsuario?.estado === '1';
      }).map(usuario => {
        const persona = this.personas.find(p => p.id === usuario.id_persona);
        const tipoUsuario = this.tipoUsuarios.find(tu => tu.id === usuario.id_tipousuario);

        return {
          ...usuario, // Agrega los datos del usuario
          dni: persona?.dni ?? 'Sin Dni',
          nombres: persona?.nombres ?? 'Sin Nombres',
          apellidos: persona?.apellidos ?? 'Sin Apellidos',
          direccion: persona?.direccion ?? 'Sin Direccion',
          telefono: persona?.telefono ?? 'Sin Telefono',
          email: persona?.email ?? 'Sin Email',
          tipoUsuarioNombre: tipoUsuario?.nombre ?? 'Sin Tipo Usuario'
        };
      });
    }

  }

  combineData2(): void {
    if (this.usuarios.length > 0 && this.personas.length > 0 && this.tipoUsuarios.length > 0) {
      this.usuariosCombinados2 = this.usuarios.filter(usuario => {
        const persona = this.personas.find(p => p.id === usuario.id_persona);
        const tipoUsuario = this.tipoUsuarios.find(tu => tu.id === usuario.id_tipousuario);

        // Verifica si los tres registros tienen estado "0"
        return usuario.estado === '0' && persona?.estado === '1' && tipoUsuario?.estado === '1';
      }).map(usuario => {
        const persona = this.personas.find(p => p.id === usuario.id_persona);
        const tipoUsuario = this.tipoUsuarios.find(tu => tu.id === usuario.id_tipousuario);

        return {
          ...usuario, // Agrega los datos del usuario
          dni: persona?.dni ?? 'Sin Dni',
          nombres: persona?.nombres ?? 'Sin Nombres',
          apellidos: persona?.apellidos ?? 'Sin Apellidos',
          direccion: persona?.direccion ?? 'Sin Direccion',
          telefono: persona?.telefono ?? 'Sin Telefono',
          email: persona?.email ?? 'Sin Email',
          tipoUsuarioNombre: tipoUsuario?.nombre ?? 'Sin Tipo Usuario'
        };
      });
    }
  }

  openModalUsuario(usercombined?: any) {

  }

  deleteUsuario(id: number) {
    this.alertify.confirm2(
      "¿Estás seguro de que deseas eliminar este Usuario?",
      () => {
        this.usuarioService.deleteUser(id).subscribe(() => {
          this.ngOnInit();
          this.alertify.success('Usuario Eliminado!');
        })
      },
      () => {
        // Acción a realizar si se cancela
        console.log("Acción cancelada");
      },
      {
        okText: "Sí",
        cancelText: "Cancelar",
        title: "Eliminar Usuario"
      }
    );
  }

  restoreUsuario(id: number) {
    this.alertify.confirm2(
      "¿Estás seguro de que deseas Habilitar este Usuario?",
      () => {
        this.usuarioService.restoreUser(id).subscribe(() => {
          this.ngOnInit();
          this.alertify.success('Usuario Habilitado!');
        })
      },
      () => {
        // Acción a realizar si se cancela
        console.log("Acción cancelada");
      },
      {
        okText: "Sí",
        cancelText: "Cancelar",
        title: "Habilitar Usuario"
      }
    );
  }

  mostrarDetalleUsuario(row: any) {
    const message = `
      <strong>ID:</strong> ${row.id} <br>
      <strong>DNI:</strong> ${row.dni} <br>
      <strong>NOMBRES:</strong> ${row.nombres}<br>
      <strong>APELLIDOS:</strong> ${row.apellidos} <br>
      <strong>TELEFONO:</strong> ${row.telefono} <br>
      <strong>DIRECCION:</strong> ${row.direccion} <br>
      <strong>EMAIL:</strong> ${row.email} <br>
      <strong>TIPO USUARIO:</strong> ${row.tipoUsuarioNombre} <br>
    `;

    const title = `<h4>Detalles del Usuario:</h4>`;

    this.alertify.alert(message, title, () => {
      this.alertify.message('Detalles visualizados.');
    });


  }
}
