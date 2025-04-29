import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/UsuarioModel'
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/alertify.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usuario: Usuario | undefined;
  constructor(private fb: FormBuilder, private userService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    // if (this.loginForm.valid) {
    const formData = this.loginForm.value;
    console.log('Usuario:', formData.username);
    console.log('Contraseña:', formData.password);
    this.userService.login(formData.username).subscribe(data => {
      console.log(data);
      if (data.password == formData.password) {
        console.log('RAAA CSMR');
        localStorage.setItem('tipoUsuario', data.id_tipousuario.toString());
        if (data.id_tipousuario == 1) {
          this.router.navigate(['/index']);
        } else if (data.id_tipousuario == 2) {
          this.router.navigate(['/index']);
        }
      }
    });


    //   // Aquí puedes manejar la autenticación (por ejemplo, enviando a un backend)
    // }
  }
}
