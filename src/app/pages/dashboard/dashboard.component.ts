import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit{
  
  medicoReducido: any[] = [];

  constructor(private medicoService: LoginService){ 

  }
  
  ngOnInit(): void {
    // Obtén los datos del médico desde el servicio
    const medicoData = this.medicoService.getMedicoData();

    if (medicoData) {
      console.log('Datos del médico en InicioComponent:', medicoData);
      this.userLoginOn = true;
      this.adminLoginOn = medicoData.esAdmin;
      console.log(this.adminLoginOn);
    
    } else {
      console.log('No hay datos del médico en InicioComponent.');
      this.userLoginOn = false;
    }
    
  }

  // Para determinar 
  userLoginOn: Boolean = false;

  adminLoginOn: Boolean | undefined;

}
