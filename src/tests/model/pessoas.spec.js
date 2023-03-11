import { describe,expect, it, jest,} from "@jest/globals";
import PessoaController from "../../controllers/PessoaController.js";
import Pessoa from "../../models/Pessoa.js";


describe("Deve retornar teste de unidade de pessoa", () => {
    afterEach(() => jest.clearAllMocks());

    const dataPessoa = new Date();
    const objetoPessoa = {
        nome: 'Wanilk Caldas',
        cpf: "12345678901",
        nit: '123165465446546',
        dataNascimento: dataPessoa,
        estrangeiro: false,
        pais: 'Brasil',
        cep: '68465651656',
        logradouro: 'Rua 1',
        numero: '123',
        bairro: 'Bairro das estrelas',
        cidade: 'Cidade das constelações',
        estado: 'Estado das galáxias',
        telefone: '98565656546',
        telefoneContato: '98565656546',
    
    };

    it("Deve uma nova pessoa", () => {
        const pessoa = new Pessoa(objetoPessoa);
        expect(pessoa).toEqual(expect.objectContaining(objetoPessoa));
        expect(pessoa).toHaveProperty('nome', 'Wanilk Caldas');
    });

    it("Deve fazer uma chamada simulada de cadastro ao banco de dados", () => {
        const pessoa = new Pessoa(objetoPessoa);
      PessoaController.cadastrarPessoa = jest.fn().mockReturnValue({
        nome: 'Wanilk Caldas',
        cpf: "12345678901",
        nit: '123165465446546',
        dataNascimento: dataPessoa,
        estrangeiro: false,
        pais: 'Brasil',
        cep: '68465651656',
        logradouro: 'Rua 1',
        numero: '123',
        bairro: 'Bairro das estrelas',
        cidade: 'Cidade das constelações',
        estado: 'Estado das galáxias',
        telefone: '98565656546',
        telefoneContato: '98565656546',
      });
      const retorno = PessoaController.cadastrarPessoa();
        expect(retorno).toEqual(expect.objectContaining({ dataNascimento: expect.any(Date),...objetoPessoa,}));
    });

});

