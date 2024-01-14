import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  medicoReducido: any[] = [];

  constructor(private medicoService: LoginService,
    private router: Router){

  }
  
  ngOnInit(): void {
    // Obtén los datos del médico desde el servicio
    const medicoData = this.medicoService.getMedicoData();

    if (medicoData) {
      console.log('Datos del médico en InicioComponent:', medicoData);
      this.userLoginOn = true;
    } else {
      console.log('No hay datos del médico en InicioComponent.');
      this.userLoginOn = false;
    }
    
  }

  // Para Mostrar los botones de iniciar Sesion.
  userLoginOn: Boolean = false;

  // Para Mostar el navbar en movil.
  isNavbarCollapsed = true;
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  // Método para cerrar sesión
  logout(): void {
    // Limpia los datos del médico
    this.medicoService.clearMedicoData();
    // Otros pasos para cerrar sesión, como redirección a la página de inicio

    console.log("Cerro la sesión");
    
    // Para Mostrar los botones de iniciar Sesion.
    this.userLoginOn = false;
  }

}
