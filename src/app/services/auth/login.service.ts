import { Injectable } from '@angular/core';
import { loginRequest } from './loginRequest';
import { HttpClient } from '@angular/common/http';
import { MedicoElement } from 'src/app/auth/login/login.component';
import { Observable } from 'rxjs';

const base_url = "http://localhost:8080/apiMedico"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  /**
   * get all medicos
   * @returns 
   */
  getMedico(){
    //Definimos los endpoints.
    const endpoint = `${base_url}/medico`;
    return this.http.get(endpoint);
  }

  // Definimos el Key del DataStorage.
  private medicoDataKey = 'medicoData';

  setMedicoData(data: MedicoElement): void {
    localStorage.setItem(this.medicoDataKey, JSON.stringify(data));
  }

  getMedicoData(): MedicoElement | null {
    const storedData = localStorage.getItem(this.medicoDataKey);
    return storedData ? JSON.parse(storedData) : null;
  }

  clearMedicoData(): void {
    localStorage.removeItem(this.medicoDataKey);
  }

  enviarCorreo(destinatario: string, asunto: string, cuerpo: string): Observable<any> {

    const payload = { destinatario, asunto, cuerpo };
    const endpoint = `${base_url}/enviar-correo`;

    return this.http.post(endpoint, payload);
  }
}
