import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SenhasService {
  // variables
  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public atendidaGeral: number = 0;
  public atendidaPrior: number = 0;
  public atendidaExame: number = 0;
  public inputNovaSenha: string = '';
  public senhasArray: any = { SG: [], SP: [], SE: [] };
  public senhasFaltandoChamar: any[] = [];
  public senhasChamadas: any[] = [];
  public relatorioSenhasAtendidas: any[] = [];

  // method to add new password to password array
  senhaRetirada(tipoSenha: string = '') {
    let senhaRetiradaObjeto = {
      icon: '',
      color: '',
      senha: '',
      tipo_senha: '',
      tm_geracao: new Date().toISOString(),
    };

    if (tipoSenha == 'SG') {
      this.somaGeral();
      senhaRetiradaObjeto.senha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SG'].length + 1).toString().padStart(2, '0');
      senhaRetiradaObjeto.icon = 'person';
      senhaRetiradaObjeto.color = 'dark';
      senhaRetiradaObjeto.tipo_senha = 'SG';
      this.senhasArray.SG.push({ ...senhaRetiradaObjeto });
    } else if (tipoSenha == 'SP') {
      this.somaPrior();
      senhaRetiradaObjeto.senha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SP'].length + 1).toString().padStart(2, '0');
      senhaRetiradaObjeto.icon = 'warning';
      senhaRetiradaObjeto.color = 'danger';
      senhaRetiradaObjeto.tipo_senha = 'SP';
      this.senhasArray.SP.push({ ...senhaRetiradaObjeto });
    } else if (tipoSenha == 'SE') {
      this.somaExame();
      senhaRetiradaObjeto.senha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SE'].length + 1).toString().padStart(2, '0');
      senhaRetiradaObjeto.icon = 'document';
      senhaRetiradaObjeto.color = 'dark';
      senhaRetiradaObjeto.tipo_senha = 'SE';
      this.senhasArray.SE.push({ ...senhaRetiradaObjeto });
    }
    this.senhasFaltandoChamar.push({ ...senhaRetiradaObjeto });
  }

  //method to call password
  chamarSenha() {
    if (this.senhasFaltandoChamar.length === 0) {
      alert('Ainda não há senhas no painel de chamada!');
    } else {
      let senhaPrioritariaEncontrada = false;
      if (this.senhasChamadas.length <= 4) {
        for (let senha of this.senhasFaltandoChamar) {
          if (senha.icon === 'warning') {
            this.senhasChamadas.push(senha);
            this.removerSenhaDoArray(senha);
            senhaPrioritariaEncontrada = true;
            break;
          }
        }
        if (
          !senhaPrioritariaEncontrada &&
          this.senhasFaltandoChamar.length > 0
        ) {
          let próximaSenha = this.senhasFaltandoChamar.shift();
          this.senhasChamadas.push(próximaSenha);
        }
        this.displaySenhasAtendidas();
      } else {
        alert('O painel de chamadas está cheio. Por favor, limpe o painel.');
      }
    }
  }

  //method to remove password from array
  removerSenhaDoArray(senha: any) {
    const index = this.senhasFaltandoChamar.findIndex((s) => s === senha);
    if (index !== -1) {
      this.senhasFaltandoChamar.splice(index, 1);
    }
  }

  //methods to count the number of times the password has been called
  somaGeral() {
    this.senhasGeral++;
    this.senhasTotal++;
  }
  somaPrior() {
    this.senhasPrior++;
    this.senhasTotal++;
  }
  somaExame() {
    this.senhasExame++;
    this.senhasTotal++;
  }

  //method to count the number of times the password was answered
  displaySenhasAtendidas() {
    this.atendidaGeral = 0;
    this.atendidaPrior = 0;
    this.atendidaExame = 0;

    for (let senha of this.senhasChamadas) {
      if (senha.tipo_senha == 'SG') {
        this.atendidaGeral++;
      } else if (senha.tipo_senha == 'SP') {
        this.atendidaPrior++;
      } else {
        this.atendidaExame++;
      }
    }
    this.relatorioSenhasAtendidas.push({ ...this.senhasChamadas });
  }

  //method for cleaning the window panel
  limparPainel() {
    if (this.senhasChamadas.length >= 4) {
      this.senhasChamadas = [];
    } else if (this.senhasChamadas.length === 0) {
      alert('Ainda não há senhas no painel');
    } else {
      alert('Ainda há espaço no painel');
    }
  }

  constructor() {}
}
