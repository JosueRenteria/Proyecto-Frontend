import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { UsersService } from 'src/app/services/users/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  constructor(private medicoService: LoginService, 
    private router: Router, 
    private clinicoServices: UsersService,
    private userService: UsersService, private sanitizer: DomSanitizer){}

  // Definimos el nombre del Usuario
  name: string = '';

  ngOnInit(): void {
    // Obtén los datos del médico desde el servicio
    const medicoData = this.medicoService.getMedicoData();

    if (medicoData) {
      console.log('Datos del médico en InicioComponent:', medicoData);
      // Obtenemos el nombre del administrador.
      this.name = medicoData.nombre;
    } else {
      console.log('No hay datos del médico en InicioComponent.');
    }

    this.getHistorialC();
  }

  // Declara una variable para almacenar los datos
  historiales: any[] = [];

  // Metodo para obtener todos los Historiales.
  getHistorialC(): void {
    this.clinicoServices.getHistorialC().subscribe({
      next: (data: any) => {
        console.log("Respuesta historiales clinicos:", data);
        // Asigna los datos a la variable admins
        this.historiales = data;
      },
      error: (error: any) => {
        console.log("Error:", error);
        // Manejar el error de manera más amigable o realizar un registro de errores
      }
    });
  }

  descargarHistorial(historial: HistorialElement): void {
    // Obtener el PDF del servicio con el responseType 'arraybuffer'
    this.userService.getPdf(historial.idHistorialClinico, { responseType: 'arraybuffer' }).subscribe(
      (data: ArrayBuffer) => {
        // Crear un Blob con los datos del PDF
        const blob = new Blob([data], { type: 'application/pdf' });

        // Crear una URL segura para el Blob
        const pdfUrl = URL.createObjectURL(blob);

        // Crear un enlace de descarga
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `historial_${historial.idHistorialClinico}.pdf`;

        // Simular un clic en el enlace para iniciar la descarga
        document.body.appendChild(link);
        link.click();

        // Liberar recursos después de la descarga
        document.body.removeChild(link);
        URL.revokeObjectURL(pdfUrl);
      },
      error => {
        console.error('Error al obtener el PDF', error);
      }
    );
  }

  eliminarHistorial(historial: any): void {
    // Muestra una alerta de confirmación personalizada con SweetAlert
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      // Verifica si el usuario confirmó la acción
      if (result.isConfirmed) {
        // Lógica para eliminar el historial clínico
        this.clinicoServices.eliminarHistorial(historial.idHistorialClinico).subscribe(
          (respuesta) => {
            // Manejar la respuesta del servicio
            // Muestra una alerta con SweetAlert para informar al usuario sobre el resultado de la eliminación
            Swal.fire('Éxito', 'Historial clínico eliminado con éxito', 'success');
  
            // Actualizar la lista de historiales clínicos después de la eliminación si es necesario
            this.getHistorialC();
  
            // Llamada al servicio eliminarPaciente
            this.clinicoServices.eliminarPaciente(historial.paciente.idPaciente).subscribe(
              (respuestaEliminarPaciente) => {
                // Manejar la respuesta del servicio eliminarPaciente
                // Puedes agregar más lógica aquí según sea necesario
                console.log('Paciente eliminado con éxito', respuestaEliminarPaciente);
              },
              (errorEliminarPaciente) => {
                console.error('Error al eliminar paciente', errorEliminarPaciente);
                // Puedes manejar el error de eliminación de paciente aquí
              }
            );
          },
          (error) => {
            console.error('Error al eliminar historial clínico', error);
  
            // Muestra una alerta con SweetAlert para informar al usuario sobre el error
            Swal.fire('Error', 'No se pudo eliminar el historial clínico', 'error');
          }
        );
      }
    });
  }
  

}

export interface HistorialElement {
  idHistorialClinico: number;
  fecha: string;
  peso: number;
  altura: number;
  alergiasMedicamentos: string;
  medicamentosActuales: string;
  fuma: string;
  alcohol: string;
  vacunaNeumonia: string;
  fechaUltimaDosis: string;
  sintomasPrincipales: string;
  tiempoSintomas: string;
  contactoInfeccionRespiratoria: string;
  viajeAreasBrotes: string;
  antecedentesRespiratorios: string;
  problemasSalud: string;
  sudoracionNocturna: string;
  perdidaApetito: string;
  infeccionRespiratoriaReciente: string;
  medicamentosActualidad: string;
  preguntasAdicionales: string;
  paciente: {
    idPaciente: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaNacimiento: string;
    genero: string;
    direccion: string;
    telefono: string;
    correo: string;
    medico: {
      idMedico: number;
    }
  }
}
