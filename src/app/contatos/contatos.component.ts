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

  constructor(private contatoService: ContatosService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    console.log(this.form?.value);

    /*this.contatoService.salvar(c).subscribe({
      next: (response) => {
        console.log(response);
      }
    });*/
  }

}
