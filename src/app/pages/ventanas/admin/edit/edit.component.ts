import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryElement } from 'src/app/pages/admin/admin.component';
import { AdminService } from 'src/app/services/admin/admin.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  adminData: CategoryElement | undefined;
  formulario: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private servicioActualizacion: AdminService) {
    this.adminData = undefined;
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Recibe los datos de la ruta
    this.route.paramMap.subscribe(params => {
      const adminDataString = params.get('adminData');
      if (adminDataString) {
        this.adminData = JSON.parse(adminDataString);

        // Puedes inicializar los valores del formulario con los datos de adminData
        this.formulario.setValue({
          nombre: this.adminData?.nombre || '',
          apellidoMaterno: this.adminData?.apellidoMaterno || '',
          apellidoPaterno: this.adminData?.apellidoPaterno || '',
          fechaNacimiento: this.adminData?.fechaNacimiento || '',
        });
      }
    });

    console.log("Datos llegada a otra ventana", this.adminData);
  }

  confirmarActualizacion(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.actualizarDatos(); // Llama al método de actualización si el usuario confirma
      } else{
        this.router.navigate(['/inicio']);
      }
    });
  }

  actualizarDatos(): void {
    if (this.adminData && this.adminData.usuario) {
      const idMedico = this.adminData.idMedico;
      const idUsuario = this.adminData.usuario.idUsuario;
  
      this.servicioActualizacion.actualizarMedico(idMedico, idUsuario, this.formulario.value).subscribe(
        (respuesta) => {
          // Manejar la respuesta del servidor aquí
          console.log('Datos actualizados con éxito', respuesta);
  
          // Después de manejar la respuesta, redirige a la página de inicio
          this.router.navigate(['/inicio']);
        },
        (error) => {
          console.error('Error al actualizar datos', error);
          // Puedes mostrar mensajes de error o manejarlos según tus necesidades
        }
      );
    }
  }

  // Obtener el nombre
  get nombre() {
    return this.formulario.get('nombre');
  }

  // Obtener el Apellido Materno
  get apellidoMaterno() {
    return this.formulario.get('apellidoMaterno');
  }

  // Obtener el Apellido Paterno
  get apellidoPaterno() {
    return this.formulario.get('apellidoPaterno');
  }

  // Obtener el Apellido Paterno
  get fechaNacimiento() {
    return this.formulario.get('fechaNacimiento');
  }
}
