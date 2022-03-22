import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contato } from '../contatos/contato.model';

@Component({
  selector: 'app-contatos-detalhes',
  templateUrl: './contatos-detalhes.component.html',
  styleUrls: ['./contatos-detalhes.component.css']
})
export class ContatosDetalhesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ContatosDetalhesComponent>,
    @Inject(MAT_DIALOG_DATA) public contato: Contato) { }

  ngOnInit(): void {
  }

  fechar() {
    this.dialogRef.close();
  }

}
