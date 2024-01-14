import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { loginRequest } from 'src/app/services/auth/loginRequest';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  // Los componentes del objeto de login
  loginForm = this.formBuilder.group({
    email:['', [Validators.required, Validators.email]],
    password:['', Validators.required]
  });

  // Propiedad para entrar al email del loginForm.
  get email(){
    return this.loginForm.controls.email;
  }

  // Propiedad para entrar al pasword del loginForm.
  get password(){
    return this.loginForm.controls.password;
  }

  // Añadir una propiedad para almacenar el array de medicoReducido
  private medicoReducido: MedicoElement[] = [];

  /**
   * Metodo para el login y el boton iniciar sesion.
   */
  login() {
    if (this.loginForm.valid) {
      this.getMedico(); // Llama a getMedico para obtener los datos
  
      // Resto de la lógica movida dentro del bloque next
    } else {
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los Datos.");
    }
  }
  
  // Inyectamos el servicio
  private loginService = inject(LoginService);

  getMedico(): void {
    this.loginService.getMedico().subscribe({
      next: (data: any) => {
        console.log("Respuesta categories:", data);
        
        // Mandamos a llamar al Método para reducir el JSON
        this.medicoReducido = this.processCategoriesResponse(data);
        console.log("Medico reducido:", this.medicoReducido);
  
        // Ahora, mueve la lógica del login aquí dentro
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;
  
        const foundMedico = this.medicoReducido.find(
          (medico) => medico.correo === email && medico.contrasena === password
        );
  
        if (foundMedico) {
          Swal.fire({
            title: 'Ingreso exitoso',
            icon: 'success',
            timer: 2000, // Ajusta el tiempo que deseas que la alerta esté visible
            showConfirmButton: false
          });
  
          // Establece los datos del médico en el servicio
          this.loginService.setMedicoData(foundMedico);
          // Redirección a la página de inicio después de la autenticación
          this.router.navigateByUrl('/inicio');


          const resultadoString = 'Bienvenido: ' + foundMedico.nombre + " espero que estes bien y disfrutes todos los servicios";

          //Para enviar el correo
          this.enviarCorreo(foundMedico.correo.toString(), resultadoString);

          // Reseteamos los valores del formulario.
          this.loginForm.reset();
          this.loginForm.markAsUntouched();
        } else {
          Swal.fire({
            title: 'Correo no encontrado o contraseña incorrecta',
            icon: 'error'
          });
        }
      },
      error: (error: any) => {
        console.log("Error:", error);
        // Manejar el error de manera más amigable o realizar un registro de errores
      }
    });
  }

  private enviarCorreo(destinatario: string, cuerpo: string): void {
    const asunto = 'Inicio de Sesión';
  
    this.loginService.enviarCorreo(destinatario, asunto, cuerpo).subscribe(
      (response) => {
        console.log('Correo enviado con éxito', response);
        // Puedes realizar acciones adicionales si es necesario
      },
      (error) => {
        // Manejo de errores
        console.error('Error al enviar el correo', error);
      }
    );
  }
  

  // Metodo para procesar la respuesta
  processCategoriesResponse(data: any): any {
    // Transforma los datos para quedarte solo con los campos deseados
    const medicoReducido = data.map((medico: any) => ({
      idMedico: medico.idMedico,
      correo: medico.usuario.correo,
      contrasena: medico.usuario.contrasena,
      esAdmin: medico.usuario.esAdmin,
      nombre: medico.nombre,
    }));

    return medicoReducido;
  }
  
  ngOnInit(): void {}

  // Definimos nuestro constructor.
  constructor (private formBuilder: FormBuilder, 
    private router: Router, 
    private loginServices: LoginService){
  }

}

// En la interfaz MedicoElement
export interface MedicoElement {
  idMedico: any;
  correo: string;
  contrasena: string;
  esAdmin: boolean;
  nombre: string;
}