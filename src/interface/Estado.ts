export interface Estado {
  id: number;
  nome: string;
  sigla: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}