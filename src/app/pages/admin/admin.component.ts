import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { LoginService } from 'src/app/services/auth/login.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  constructor(private medicoService: LoginService, 
    private router: Router, 
    private adminService: AdminService,
    private servicioEliminacion: AdminService){}

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

    this.getAdmin();

  }

  // Definimos el nombre del Usuario
  name: string = '';


  // Inyectamos el servicio
  private categoryService = inject(AdminService);

  // Declara una variable para almacenar los datos
  admins: any[] = [];

  // Metodo para obtener todos los Usuarios.
  getAdmin(): void {
    this.adminService.getAdmins().subscribe({
      next: (data: any) => {
        console.log("Respuesta categories:", data);
        // Asigna los datos a la variable admins
        this.admins = data;
      },
      error: (error: any) => {
        console.log("Error:", error);
        // Manejar el error de manera más amigable o realizar un registro de errores
      }
    });
  }

  // Metodo para eliminar un campo.
  editarAdmin(admin: CategoryElement): void {
    // Navega a la ruta de edición y pasa los datos como parámetros
    this.router.navigate(['/edit-admin', { adminData: JSON.stringify(admin) }]);
  }
  
  eliminarAdmin(admin: any): void {
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
        // Lógica para eliminar el administrador
        // Puedes llamar a tu servicio de eliminación o realizar cualquier otra acción necesaria
        this.servicioEliminacion.eliminarMedico(admin.idMedico).subscribe(
          (respuesta) => {
            // Manejar la respuesta del servicio
            // Muestra una alerta con SweetAlert para informar al usuario sobre el resultado de la eliminación
            Swal.fire('Éxito', 'Usuario eliminado con éxito', 'success');
  
            // Actualizar la lista de usuarios después de la eliminación si es necesario
            this.getAdmin();
          },
          (error) => {
            console.error('Error al eliminar usuario', error);
  
            // Muestra una alerta con SweetAlert para informar al usuario sobre el error
            Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
          }
        );
      }
    });
  }
}

export interface CategoryElement {
  idMedico: number;
  nombre: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  correo: string;
  fechaNacimiento: string;
  usuario?: {
    idUsuario: number;
    // otras propiedades de usuario si las tienes
  };
}