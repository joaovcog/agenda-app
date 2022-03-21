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

  constructor(private contatoService: ContatosService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    const formValues = this.form.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email);

    this.contatoService.salvar(contato).subscribe({
      next: (response) => {
        this.contatos.push(response);
        console.log(this.contatos);
      }
    });
  }

}
