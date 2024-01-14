import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const base_url = "http://localhost:8080/apiHistorialClinico"

const base_url2 = "http://localhost:8080/apiPaciente"

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  /**
   * get all medicos
   * @returns 
   */
  getHistorialC(){
    //Definimos los endpoints.
    const endpoint = `${base_url}/clinico`;
    return this.http.get(endpoint);
  }

  /**
   * 
   * @param idHistorialClinico 
   * @param options 
   * @returns 
   */
  getPdf(idHistorialClinico: number, options?: any){
    //Definimos los endpoints.
    const endpoint = `${base_url}/clinico/pdf/${idHistorialClinico}`;
    return this.http.get(endpoint, options); // Pasar las opciones a la solicitud
  }

  /**
   * 
   * @param pacienteData 
   * @returns 
   */
  postPaciente(pacienteData: any): Observable<any> {
    const endpoint = `${base_url2}/paciente`;
    return this.http.post(endpoint, pacienteData);
  }

  /**
   * 
   * @param historialClinicoData 
   * @returns 
   */
  postHistorialClinico(historialClinicoData: any): Observable<any> {
    const endpoint = `${base_url}/clinico`;
    return this.http.post(endpoint, historialClinicoData);
  }
  
  /**
   * 
   * @param idPaciente 
   * @returns 
   */
  eliminarPaciente(idPaciente: number) {
    const endpoint = `${base_url2}/paciente/${idPaciente}`;
    return this.http.delete(endpoint);
  }

  /**
   * 
   * @param idHistorialClinico 
   * @returns 
   */
  eliminarHistorial(idHistorialClinico: number) {
    const endpoint = `${base_url}/clinico/${idHistorialClinico}`;
    return this.http.delete(endpoint);
  }
}
