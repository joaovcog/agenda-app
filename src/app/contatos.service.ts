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
}
