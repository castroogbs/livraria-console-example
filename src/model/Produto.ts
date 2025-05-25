export class Produto {
  static proximoId: number = 1;
  id: number;
  titulo: string;
  autor: string;
  ano: number;
  disponivel: boolean;


  constructor(titulo: string, autor: string, ano: number, disponivel: boolean) {
    this.id = Produto.proximoId++;
    this.titulo = titulo;
    this.autor = autor;
    this.ano = ano;
    this.disponivel = disponivel;
  }


  exibirDetalhes(): void {
 console.log(`#${this.id}: ${this.titulo} - ${this.autor} (${this.ano}) | Disponível: ${this.disponivel ? "Sim" : "Não"}`);
  }
}
