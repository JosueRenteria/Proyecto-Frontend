import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { UsersService } from 'src/app/services/users/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-createh',
  templateUrl: './createh.component.html',
  styleUrls: ['./createh.component.css']
})
export class CreatehComponent {
  form: FormGroup;
  idMedico: number | undefined;

  constructor(private fb: FormBuilder, private userService: UsersService, private loginService: LoginService,
    private router: Router) {
    this.form = this.fb.group({
      // Datos del Paciente
      nombre: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
    
      // Datos Médicos del Paciente
      fecha: ['', Validators.required],
      peso: ['', Validators.required],
      altura: ['', Validators.required],
      alergiasMedicamentos: ['', Validators.required],
      medicamentosActuales: ['', Validators.required],
      fuma: ['', Validators.required],
      alcohol: ['', Validators.required],
      vacunaNeumonia: ['', Validators.required],
      fechaUltimaDosis: ['', Validators.required],
      sintomasPrincipales: ['', Validators.required],
      tiempoSintomas: ['', Validators.required],
      contactoInfeccionRespiratoria: ['', Validators.required],
      viajeAreasBrotes: ['', Validators.required],
      antecedentesRespiratorios: ['', Validators.required],
      problemasSalud: ['', Validators.required],
      sudoracionNocturna: ['', Validators.required],
      perdidaApetito: ['', Validators.required],
      infeccionRespiratoriaReciente: ['', Validators.required],
      medicamentosActualidad: ['', Validators.required],
      preguntasAdicionales: ['', Validators.required]
    });    
  }

  confirmarDatos(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning', 
      showCancelButton: true,
      confirmButtonText: 'Sí, registrar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmarRegistro();
        this.router.navigate(['/inicio']);
            Swal.fire({
              title: 'Se registro adecuadamente',
              icon: 'success',
              timer: 1000, // Ajusta el tiempo que deseas que la alerta esté visible
              showConfirmButton: false
            });
      } else {
        this.router.navigate(['/inicio']);
        Swal.fire({
          title: 'Se cancelo la opcción',
          icon: 'error'
        });
      }
    });
  }

  confirmarRegistro() {
    // Obtén los datos del médico desde el servicio
    const medicoData = this.loginService.getMedicoData();
  
    if (medicoData) {
      console.log('Datos del médico en InicioComponent:', medicoData);
      // Almacenamos el idMedico
      this.idMedico = medicoData.idMedico;
  
      // Ponemos esto así.
      this.form.patchValue({
        medico: { idMedico: this.idMedico }
      });
  
      // Para el paciente.
      const formData = this.form.value;
      const pacienteData = {
        nombre: formData.nombre,
        apellidoMaterno: formData.apellidoMaterno,
        apellidoPaterno: formData.apellidoPaterno,
        fechaNacimiento: formData.fechaNacimiento,
        genero: formData.genero,
        direccion: formData.direccion,
        telefono: formData.telefono,
        correo: formData.correo,
        //Para el id del Medico.
        medico: { idMedico: this.idMedico }
      };
      console.log("Paciente", pacienteData);
  
      // Llama al servicio para enviar los datos del paciente
      this.userService.postPaciente(pacienteData).subscribe(
        (response) => {
          // Maneja la respuesta del servidor si es necesario
          console.log('Respuesta del servidor:', response);
          const idPaciente = response.idPaciente;
          console.log('ID del paciente:', idPaciente);
  
          // Aqui va para historial.
          // Para el historialClinicoData.
          const historialClinicoData = {
            fecha: formData.fecha,
            peso: formData.peso,
            altura: formData.altura,
            alergiasMedicamentos: formData.alergiasMedicamentos,
            medicamentosActuales: formData.medicamentosActuales,
            fuma: formData.fuma,
            alcohol: formData.alcohol,
            vacunaNeumonia: formData.vacunaNeumonia,
            fechaUltimaDosis: formData.fechaUltimaDosis,
            sintomasPrincipales: formData.sintomasPrincipales,
            tiempoSintomas: formData.tiempoSintomas,
            contactoInfeccionRespiratoria: formData.contactoInfeccionRespiratoria, 
            viajeAreasBrotes: formData.viajeAreasBrotes,
            antecedentesRespiratorios: formData.antecedentesRespiratorios, 
            problemasSalud: formData.problemasSalud,
            sudoracionNocturna: formData.sudoracionNocturna,
            perdidaApetito: formData.perdidaApetito,
            infeccionRespiratoriaReciente: formData.infeccionRespiratoriaReciente, 
            medicamentosActualidad: formData.medicamentosActualidad,
            preguntasAdicionales: formData.preguntasAdicionales,
            paciente: { idPaciente: idPaciente  } // Se definirá después
          };

          console.log("Historial Clínico", historialClinicoData);

          // Llama al servicio para enviar los datos del historial clínico
          this.userService.postHistorialClinico(historialClinicoData).subscribe(
            (historialClinicoResponse) => {
            // Maneja la respuesta del servidor para el historial clínico si es necesario
            console.log('Respuesta del servidor (Historial Clínico):', historialClinicoResponse);
            
          },
          (historialClinicoError) => {
            // Maneja cualquier error que pueda ocurrir durante la llamada al servicio de historial clínico
            console.error('Error en la llamada al servicio de historial clínico:', historialClinicoError);
          }
      );
        },
        (error) => {
          // Maneja cualquier error que pueda ocurrir durante la llamada al servicio
          console.error('Error en la llamada al servicio de paciente:', error);
        }
      );
      
    }
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