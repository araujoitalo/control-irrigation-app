import { Fazenda } from './Fazenda';
import { Telefone } from "./Telefone";

export class User {
	idUsuario: Number;
	login: String;
	senha: String;
	nome: String;

	fazendas: Array<Fazenda>;

	telefones: Array<Telefone>;
}
