import { Component, OnInit } from '@angular/core';
import { ContatosService } from '../contatos.service';
import { Contato } from './contato.model';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent implements OnInit {

  constructor(private contatoService: ContatosService) { }

  ngOnInit(): void {
    const c = new Contato();
    c.nome = 'José';
    c.email = 'jose@email.com';
    c.favorito = false;

    this.contatoService.salvar(c).subscribe({
      next: (response) => {
        console.log(response);
      }
    });
  }

}
