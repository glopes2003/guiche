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
  public senhaAtendidaGeral: number = 0;
  public inputNovaSenha: string = '';
  public senhasArray: any = { SG: [], SP: [], SE: [] };
  public senhasFaltandoChamar: any[] = [];
  public senhasChamadas: any[] = [];

  // Função para adicionar uma nova senha ao array e exibir na tela
  senhaRetirada(tipoSenha: string = '') {
    let senhaRetiradaObjeto = {
      icon: '',
      color: '',
      senha: '',
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
      this.senhasArray.SE.push({ ...senhaRetiradaObjeto });
    }
    this.senhasFaltandoChamar.push({ ...senhaRetiradaObjeto });
    this.displaySenha();
  }

  //methods
  displaySenha() {
    console.log(this.senhasArray);
    console.log(this.senhasFaltandoChamar);
  }
  chamarSenha() {
    if(this.senhasFaltandoChamar.length == 0) {
      alert("Ainda não há senhas no painel de chamada!")
    }
    let senhaPrioritariaEncontrada = false;
    if (this.senhasChamadas.length <= 4) {
      for (let senha of this.senhasFaltandoChamar) {
        if (senha.icon === 'warning') {
          this.senhasChamadas.push(senha);
          this.removerSenhaDoArray(senha);
          senhaPrioritariaEncontrada = true;
          break; // Sai do loop assim que a senha prioritária for encontrada
        }
      }
      if (!senhaPrioritariaEncontrada && this.senhasFaltandoChamar.length > 0) {
        let próximaSenha = this.senhasFaltandoChamar.shift();
        this.senhasChamadas.push(próximaSenha);
      }
      this.displaySenha();
    } else {
      alert("Limpe o painel!")
    }
  }
  removerSenhaDoArray(senha: any) {
    // Encontra o índice da senha no array atual e a remove
    const index = this.senhasFaltandoChamar.findIndex((s) => s === senha);
    if (index !== -1) {
      this.senhasFaltandoChamar.splice(index, 1);
    }
  }
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
  atendidaGeral() {
    this.senhaAtendidaGeral = 0; // Certifique-se de redefinir a contagem antes de percorrer o array
    
    for (let i = 0; i < this.senhasChamadas.length; i++) {
      let senha = this.senhasChamadas[i];
      if (senha.icon === 'warning') {
        this.senhaAtendidaGeral++;
      } else {
        break; // Para o loop se a próxima senha atendida for diferente do ícone 'warning'
      }
    }
  }
  

  limparPainel() {
    if (this.senhasChamadas.length >= 4 ) {
      this.senhasChamadas = [];
    } else if (this.senhasChamadas.length == 0) {
      alert('Ainda não há senhas no painel');
    } else if (this.senhasChamadas.length >= 3) {
      alert('Ainda há espaço no painel');
    }
  }
  constructor() {}
}
// Remove o próximo da fila (o primeiro elemento do array)
      // this.senhasChamadas.shift();