import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contato } from './contatos/contato.model';
import { PaginaContato } from './contatos/pagina-contato.model';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  baseUrl: string = environment.apiBaseUrl + '/contatos';

  constructor(private http: HttpClient) { }

  salvar(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.baseUrl, contato);
  }

  listar(page: number, size: number): Observable<PaginaContato> {
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http.get<PaginaContato>(`${this.baseUrl}?${params.toString()}`);
  }

  favoritar(contato: Contato): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${contato.id}/favorito`, null);
  }

  upload(contato: Contato, formData: FormData): Observable<Blob> {
    return this.http.put(`${this.baseUrl}/${contato.id}/foto`, formData, { responseType: 'blob' });
  }
}
