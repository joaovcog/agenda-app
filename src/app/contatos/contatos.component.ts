import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatosService } from '../contatos.service';
import { Contato } from './contato.model';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent implements OnInit {
  form!: FormGroup;
  contatos: Contato[] = [];
  colunas: string[] = ['id', 'nome', 'email', 'favorito'];

  constructor(private contatoService: ContatosService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.montarFormulario();

    this.listarContatos();
  }

  montarFormulario(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  listarContatos(): void {
    this.contatoService.listar().subscribe({
      next: (response) => {
        this.contatos = response;
      }
    });
  }

  favoritar(contato: Contato): void {
    this.contatoService.favoritar(contato).subscribe(response => {
      contato.favorito = !contato.favorito;
    });
  }

  submit(): void {
    const formValues = this.form.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email);

    this.contatoService.salvar(contato).subscribe({
      next: (response) => {
        let lista: Contato[] = [...this.contatos, response];
        this.contatos = lista;
      }
    });
  }

}
