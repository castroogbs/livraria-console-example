import { Produto } from "./Produto";


export class Livro extends Produto {
  genero: string;


  constructor(titulo: string, autor: string, ano: number, disponivel: boolean, genero: string) {
    super(titulo, autor, ano, disponivel);
    this.genero = genero;
  }


  exibirDetalhes(): void {
    super.exibirDetalhes();
    console.log(`Gênero: ${this.genero}`);
  }
}
