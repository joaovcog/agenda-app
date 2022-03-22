import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contato } from './contatos/contato.model';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  baseUrl: string = environment.apiBaseUrl + '/contatos';

  constructor(private http: HttpClient) { }

  salvar(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.baseUrl, contato);
  }

  listar(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.baseUrl);
  }

  favoritar(contato: Contato): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${contato.id}/favorito`, null);
  }

  upload(contato: Contato, formData: FormData): Observable<Blob> {
    return this.http.put(`${this.baseUrl}/${contato.id}/foto`, formData, { responseType: 'blob' });
  }
}
