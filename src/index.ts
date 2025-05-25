import readlineSync from "readline-sync";
import { LivrariaService } from "./services/LivrariaService";
import { Livro } from "./model/Livro";

const livraria = new LivrariaService();

function menu() {
  console.log("\n======= Livraria Console =======");
  console.log("1. Cadastrar livro [POST]");
  console.log("2. Listar livros [GET ALL]");
  console.log("3. Buscar livro por ID [GET BY ID]");
  console.log("4. Editar livro [PUT]");
  console.log("5. Excluir livro [DELETE]");
  console.log("6. Sair");
  return Number(readlineSync.question("Escolha uma opção: "));
}

let rodando = true;

while (rodando) {
  try {
    const opcao = menu();
    switch (opcao) {
      case 1:
        // Cadastro
        const titulo = readlineSync.question("Título: ");
        const autor = readlineSync.question("Autor: ");
        const ano = Number(readlineSync.question("Ano: "));
        if (isNaN(ano)) throw new Error("Ano inválido");
        const disponivel =
          readlineSync.question("Disponível? (s/n): ").trim().toLowerCase() ===
          "s";
        const genero = readlineSync.question("Gênero: ");
        const livro = new Livro(titulo, autor, ano, disponivel, genero);
        livraria.cadastrarLivro(livro);
        break;
      case 2:
        // Listagem
        livraria.listar();
        break;
      case 3:
        // Buscar por ID
        const idBusca = Number(readlineSync.question("ID do livro: "));
        const encontrado = livraria.buscarPorId(idBusca);
        if (encontrado) encontrado.exibirDetalhes();
        else console.log("Livro não encontrado.");
        break;
      case 4:
        // Editar
        const idEditar = Number(
          readlineSync.question("ID do livro para editar: ")
        );
        const novoTitulo = readlineSync.question(
          "Novo título (deixe em branco para manter): "
        );
        const novoAutor = readlineSync.question(
          "Novo autor (deixe em branco para manter): "
        );
        const novoAnoStr = readlineSync.question(
          "Novo ano (deixe em branco para manter): "
        );
        const novoDisponivelStr = readlineSync.question(
          "Disponível? (s/n, deixe em branco para manter): "
        );
        const novoGenero = readlineSync.question(
          "Novo gênero (deixe em branco para manter): "
        );

        const novoAno = novoAnoStr ? Number(novoAnoStr) : undefined;
        if (novoAnoStr && isNaN(novoAno as number)) throw new Error("Ano inválido");
        livraria.editar(idEditar, {
          titulo: novoTitulo || undefined,
          autor: novoAutor || undefined,
          ano: novoAnoStr ? novoAno : undefined,
          disponivel:
            novoDisponivelStr === ""
              ? undefined
              : novoDisponivelStr.toLowerCase() === "s",
          genero: novoGenero || undefined,
        });
        break;
      case 5:
        // Excluir
        const idExcluir = Number(
          readlineSync.question("ID do livro para remover: ")
        );
        livraria.excluir(idExcluir);
        break;
      case 6:
        rodando = false;
        console.log("Saindo...");
        break;
      default:
        console.log("Opção inválida.");
    }
  } catch (error) {
    console.log("Erro:", (error as Error).message);
  }
}
