import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  formulario: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private servicioAdmin: AdminService) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Puedes agregar lógica de inicialización si es necesario
  }

  confirmarRegistro(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning', 
      showCancelButton: true,
      confirmButtonText: 'Sí, registrar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.registrarNuevoUsuario();
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

  registrarNuevoUsuario(): void {
    // Obtén los valores del formulario
    const datosNuevoMedico = this.formulario.value;

    this.servicioAdmin.registrarNuevoUsuario(datosNuevoMedico).subscribe(
      (respuesta) => {
        console.log('Médico registrado con éxito', respuesta);
      },
      (error) => {
        console.error('Error al registrar médico', error);
        // Puedes mostrar mensajes de error o manejarlos según tus necesidades
      }
    );
  }

  // Métodos para acceder a los controles del formulario
  get nombre() {
    return this.formulario.get('nombre');
  }

  get apellidoMaterno() {
    return this.formulario.get('apellidoMaterno');
  }

  get apellidoPaterno() {
    return this.formulario.get('apellidoPaterno');
  }

  get fechaNacimiento() {
    return this.formulario.get('fechaNacimiento');
  }
}
