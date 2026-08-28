export interface Cliente {
  id: number;
  nomeCompleto: string;
  email: string;
  cpf: string;
  cnpj?: string;
  tipoPessoa: 'PF' | 'PJ' | string;
  dataNascimento?: string;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  foto: string;
  cargo: string;
  status: number; // 1 = Ativo, 0 = Inativo
  dataCadastro: string;
}

export type StatusOportunidade = 
  | 'Prospecção' 
  | 'Qualificação' 
  | 'Proposta' 
  | 'Negociação' 
  | 'Fechado Ganho' 
  | 'Fechado Perdido';

export interface Oportunidade {
  id: number;
  titulo: string;
  valor: number;
  status: StatusOportunidade;
  tb_clientes_id: number;
  tb_usuarios_id: number;
  dataCriacao: string;
  dataFechamento: string;
  // Campos populados/relacionados para facilitar a renderização no front
  cliente?: Cliente;
  usuario?: Usuario;
}

export interface OportunidadeFormData {
  titulo: string;
  valor: number;
  status: StatusOportunidade;
  tb_clientes_id: number;
  tb_usuarios_id: number;
  dataCriacao: string;
  dataFechamento: string;
}
