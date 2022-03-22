import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatosService } from '../contatos.service';
import { Contato } from './contato.model';

import { MatDialog } from '@angular/material/dialog';
import { ContatosDetalhesComponent } from '../contatos-detalhes/contatos-detalhes.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent implements OnInit {
  form!: FormGroup;
  contatos: Contato[] = [];
  colunas: string[] = ['foto', 'id', 'nome', 'email', 'favorito'];

  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions: number[] = [10];

  constructor(private contatoService: ContatosService, private formBuilder: FormBuilder, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.montarFormulario();

    this.listarContatos(this.pagina, this.tamanho);
  }

  montarFormulario(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  listarContatos(pagina: number = 0, tamanho: number = 10): void {
    this.contatoService.listar(pagina, tamanho).subscribe({
      next: (response) => {
        this.contatos = response.content || [];
        this.totalElementos = response.totalElements!;
        this.pagina = response.number!;
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
        this.listarContatos();
        this.snackBar.open('Contato adicionado!', 'Sucesso!', {
          duration: 2000
        });

        this.form.reset();
      }
    });
  }

  uploadFoto(event: any, contato: Contato) {
    const files = event?.target.files;

    if (files) {
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append('foto', foto);

      this.contatoService.upload(contato, formData).subscribe({
        complete: () => {
          this.listarContatos();
        }
      });
    }
  }

  removerFoto(contato: Contato) {
    contato.foto = undefined;
  }

  visualizarContato(contato: Contato): void {
    this.dialog.open(ContatosDetalhesComponent, {
      width: '400px',
      height: '450px',
      data: contato
    });
  }

  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.listarContatos(this.pagina, this.tamanho);
  }
}
