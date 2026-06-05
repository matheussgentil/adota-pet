export type TipoAnimal = "Cachorro" | "Gato";

export interface Animal {
  id: number;
  nome: string;
  tipo: TipoAnimal;
  raca: string;
  idade: string;
  localizacao: string;
  imagem: string;
  descricao: string;
  donoEmail?: string;
  telefoneDoador?: string;
}