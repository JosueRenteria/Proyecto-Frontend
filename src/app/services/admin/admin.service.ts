import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/apiMedico"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  /**
   * get all medicos
   * @returns 
   */
  getAdmins(){
    //Definimos los endpoints.
    const endpoint = `${base_url}/medico`;
    return this.http.get(endpoint);
  }

  /**
   * Put medico
   * @param idMedico 
   * @param idUsuario 
   * @param datosActualizados 
   * @returns 
   */
  actualizarMedico(idMedico: number, idUsuario: number, datosActualizados: any) {
    const endpoint = `${base_url}/medico/${idMedico}`;

    // Aquí puedes ajustar la estructura del cuerpo de la solicitud según tus necesidades
    const cuerpoSolicitud = {
      ...datosActualizados,
      usuario: {
        idUsuario: idUsuario
      }
    };

    return this.http.put(endpoint, cuerpoSolicitud);
  }

  /**
   * Elimina un médico
   * @param idMedico 
   * @returns 
   */
  eliminarMedico(idMedico: number) {
    const endpoint = `${base_url}/medico/${idMedico}`;
    return this.http.delete(endpoint);
  }

  /**
   * Registra un nuevo médico
   * @param datosNuevoMedico 
   * @returns 
   */
  registrarNuevoUsuario(datosNuevoMedico: any) {
    const endpoint = `${base_url}/medico`;

    // Ajusta la estructura del cuerpo de la solicitud según tus necesidades
    const cuerpoSolicitud = {
      ...datosNuevoMedico,
      usuario: {
        idUsuario: 10 // Siempre será 10 según tu descripción
      }
    };

    return this.http.post(endpoint, cuerpoSolicitud);
  }
}
