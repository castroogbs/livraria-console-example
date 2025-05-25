import { Produto } from "../model/Produto";
import { Livro } from "../model/Livro";


export class LivrariaService {
  private acervo: Produto[] = [];


  cadastrarLivro(livro: Livro): void {
    this.acervo.push(livro);
    console.log("Livro cadastrado com sucesso!");
  }
 listar(): void {
    if (this.acervo.length === 0) {
      console.log("Nenhum produto cadastrado.");
      return;
    }
    this.acervo.forEach(item => {
      item.exibirDetalhes();
      console.log("----");
    });
  }


  buscarPorId(id: number): Produto | undefined {
    return this.acervo.find(p => p.id === id);
  }


  editar(id: number, novosDados: Partial<Omit<Livro, 'id'>>): void {
    const item = this.buscarPorId(id);
    if (!item) {
      console.log("Produto não encontrado.");
      return;
    }
    Object.assign(item, novosDados);
    console.log("Produto atualizado com sucesso:");
    item.exibirDetalhes();
  }


  excluir(id: number): void {
    const index = this.acervo.findIndex(p => p.id === id);
    if (index !== -1) {
      this.acervo.splice(index, 1);
      console.log("Produto removido com sucesso!");
    } else {
      console.log("Produto não encontrado.");
    }
     }
}
