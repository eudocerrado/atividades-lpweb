import {Component} from '@angular/core';
import {TipoDeOcorrencia} from "./tipo-de-ocorrencia.model";
import {Ocorrencia} from "./ocorrencia.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  aluno_matricula = null;
  aluno_nome = null;
  data = null;
  pai_ou_responsavel_compareceu = false;
  pai_ou_responsavel_nome = null;
  tipo = null;
  observacao = null;
  salvar_ok = false;
  maior_igual_zero = false;
  maior_igual_zero_false = false;
  data_inicial = null;
  data_final = null;
  pesquisa_periodo = [];

  datainicial = null;
  datafinal = null;
  resultado = [];

  contadores = [0, 0, 0, 0];
  porcentagens = [0, 0, 0, 0];
  cont_abril = 0;
  cont_marco = 0;
  relacao_ocorrencias = 0;

  pesquisa(){
    this.datainicial = Date.parse(this.datainicial);
    this.datafinal = Date.parse(this.datafinal);
    

    for(let o of this.ocorrencias){
      var result = o.data;
      if((result <= this.datafinal ) && (result >= this.datainicial)){
        this.resultado.push(o);
      }
    }
  }

  tipos = [
    new TipoDeOcorrencia(0, 'indisciplina em sala de aula'),
    new TipoDeOcorrencia(1, 'comportamento inadequado com colegas'),
    new TipoDeOcorrencia(2, 'baixo índice de rendimento'),
    new TipoDeOcorrencia(3, 'indicação de atenção por assunto familiar, psicológico ou social')
  ];
   
  ocorrencias = [
    new Ocorrencia('201801', 'Ana', '2018-04-19', 0, true),
    new Ocorrencia('201802', 'Bruno', '2018-04-19', 1, false),
    new Ocorrencia('201803', 'Carla', '2018-03-23', 2, true),
    new Ocorrencia('201804', 'Elisa', '2018-03-23', 3, false),
  ];
  salvar() {
    const ocorrencia = new Ocorrencia(this.aluno_matricula,
      this.aluno_nome,
      this.data,
      this.tipo,
      this.pai_ou_responsavel_compareceu,
      this.pai_ou_responsavel_nome,
      this.observacao,
      );
    this.ocorrencias.push(ocorrencia);
    this.salvar_ok = true;
    this.maior_igual_zero = true;
    this.maior_igual_zero_false = true;
    this.atualizarEstatisticas();
    this.iniciar();
  }


  atualizarEstatisticas() {
    this.contadores = [0, 0, 0, 0];
    this.cont_abril = 0;
    this.cont_marco = 0;
    for (var i = 0; i < this.ocorrencias.length; i++) {
      this.contadores[this.ocorrencias[i].tipo]++;
      if (this.ocorrencias[i].data.indexOf("-04-") != -1) {
        this.cont_abril++;
      }
      if (this.ocorrencias[i].data.indexOf('-03-') != -1) {
        this.cont_marco++;
      }
    }
    if (this.cont_marco != 0) {
      this.relacao_ocorrencias = (this.cont_abril - this.cont_marco)/this.cont_marco * 100;

      if (this.relacao_ocorrencias >= 0){
        this.maior_igual_zero = true;
        this.maior_igual_zero_false = false;
      }
      if (this.relacao_ocorrencias < 0){
        this.maior_igual_zero = false;
        this.maior_igual_zero_false = true;
      }
    }
    for (var i = 0; i < 4; i++) {
      this.porcentagens[i] = this.contadores[i] / this.ocorrencias.length * 100;
    }
  }
  pesquisar(){
    for (let i=0; i < this.ocorrencias.length; i++ ){
      if ((this.data >= this.data_inicial)&&(this.data <= this.data_final)){
        this.pesquisa_periodo=this.ocorrencias;
      }
      else{
        return "Não existe cadastro de ocorrência nesse período.";
      }
  }
  }
  
  cancelar() {
    this.iniciar();
    this.salvar_ok = false;
    
  }

  iniciar() {
    this.aluno_matricula = null;
    this.aluno_nome = null;
    this.data = null;
    this.pai_ou_responsavel_compareceu = false;
    this.pai_ou_responsavel_nome = null;
    this.tipo = null;
    this.observacao = null;
  }
}