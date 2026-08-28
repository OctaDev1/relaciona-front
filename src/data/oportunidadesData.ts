import type { Cliente, Usuario, Oportunidade, StatusOportunidade } from '../types/OportunidadeTypes';

export const MOCK_CLIENTES: Cliente[] = [
  {
    id: 1,
    nomeCompleto: 'TechSolutions do Brasil Ltda',
    email: 'contato@techsolutions.com.br',
    cpf: '12345678901',
    cnpj: '12.345.678/0001-90',
    tipoPessoa: 'PJ',
    dataNascimento: '2015-06-12',
  },
  {
    id: 2,
    nomeCompleto: 'Inova Varejo S.A.',
    email: 'diretoria@inovavarejo.com',
    cpf: '23456789012',
    cnpj: '98.765.432/0001-10',
    tipoPessoa: 'PJ',
    dataNascimento: '2018-03-20',
  },
  {
    id: 3,
    nomeCompleto: 'Carlos Eduardo Mendes',
    email: 'carlos.mendes@gmail.com',
    cpf: '34567890123',
    tipoPessoa: 'PF',
    dataNascimento: '1985-11-04',
  },
  {
    id: 4,
    nomeCompleto: 'Global Logistics Transportes',
    email: 'operacoes@globallog.com.br',
    cpf: '45678901234',
    cnpj: '45.123.789/0001-55',
    tipoPessoa: 'PJ',
    dataNascimento: '2012-09-15',
  },
  {
    id: 5,
    nomeCompleto: 'Ana Beatriz Souza',
    email: 'ana.souza@consultoria.com',
    cpf: '56789012345',
    tipoPessoa: 'PF',
    dataNascimento: '1992-07-28',
  },
  {
    id: 6,
    nomeCompleto: 'Construtora Horizonte Azul',
    email: 'suprimentos@horizonteazul.com.br',
    cpf: '67890123456',
    cnpj: '78.901.234/0001-22',
    tipoPessoa: 'PJ',
    dataNascimento: '2010-01-10',
  },
];

export const MOCK_USUARIOS: Usuario[] = [
  {
    id: 1,
    nome: 'Felipe Oliveira Lopes',
    email: 'felipe.lopes@relaciona.com',
    foto: 'https://ik.imagekit.io/JohnnieDiniz/integrantes/foto_felipe.jpeg?updatedAt=1787845475178',
    cargo: 'Consultor Comercial Sênior',
    status: 1,
    dataCadastro: '2025-01-15',
  },
  {
    id: 2,
    nome: 'Juliana Macedo',
    email: 'juliana.macedo@relaciona.com',
    foto: 'https://ik.imagekit.io/JohnnieDiniz/integrantes/Juliana.jpg?updatedAt=1787845475220',
    cargo: 'Executiva de Contas',
    status: 1,
    dataCadastro: '2025-02-01',
  },
  {
    id: 3,
    nome: 'João Vitor Diniz',
    email: 'joao.vitor@relaciona.com',
    foto: 'https://ik.imagekit.io/JohnnieDiniz/Joao%20Vitor.jpg?updatedAt=1787581763893',
    cargo: 'Tech Lead Comercial',
    status: 1,
    dataCadastro: '2024-11-10',
  },
  {
    id: 4,
    nome: 'Guilherme Oliveira',
    email: 'guilherme.oliveira@relaciona.com',
    foto: 'https://ik.imagekit.io/JohnnieDiniz/integrantes/guilherme.jpeg?updatedAt=1787845475160',
    cargo: 'Analista de Vendas e SDR',
    status: 1,
    dataCadastro: '2025-03-05',
  },
  {
    id: 5,
    nome: 'Gabriel José Alegre',
    email: 'gabriel.alegre@relaciona.com',
    foto: 'https://ik.imagekit.io/JohnnieDiniz/integrantes/gabriel.png?updatedAt=1787845475225',
    cargo: 'Product Designer & Comercial',
    status: 1,
    dataCadastro: '2025-01-20',
  },
];

export const MOCK_OPORTUNIDADES_INICIAIS: Oportunidade[] = [
  {
    id: 1,
    titulo: 'Implantação CRM Enterprise (50 Licenças)',
    valor: 75000.0,
    status: 'Negociação',
    tb_clientes_id: 1,
    tb_usuarios_id: 1,
    dataCriacao: '2026-08-01',
    dataFechamento: '2026-09-15',
  },
  {
    id: 2,
    titulo: 'Integração API com ERP Varejo',
    valor: 32000.0,
    status: 'Proposta',
    tb_clientes_id: 2,
    tb_usuarios_id: 2,
    dataCriacao: '2026-08-10',
    dataFechamento: '2026-09-30',
  },
  {
    id: 3,
    titulo: 'Consultoria de Automação Comercial',
    valor: 18500.0,
    status: 'Fechado Ganho',
    tb_clientes_id: 3,
    tb_usuarios_id: 3,
    dataCriacao: '2026-07-20',
    dataFechamento: '2026-08-25',
  },
  {
    id: 4,
    titulo: 'Módulo de Rastreamento e Logística no CRM',
    valor: 95000.0,
    status: 'Qualificação',
    tb_clientes_id: 4,
    tb_usuarios_id: 4,
    dataCriacao: '2026-08-18',
    dataFechamento: '2026-10-10',
  },
  {
    id: 5,
    titulo: 'Treinamento de Equipe e Onboarding VIP',
    valor: 12000.0,
    status: 'Prospecção',
    tb_clientes_id: 5,
    tb_usuarios_id: 5,
    dataCriacao: '2026-08-24',
    dataFechamento: '2026-09-20',
  },
  {
    id: 6,
    titulo: 'Expansão de Unidades e Gestão Multi-Filial',
    valor: 140000.0,
    status: 'Negociação',
    tb_clientes_id: 6,
    tb_usuarios_id: 1,
    dataCriacao: '2026-08-05',
    dataFechamento: '2026-09-28',
  },
];

const STORAGE_KEY = 'relaciona_oportunidades_v2';
export const OPORTUNIDADES_UPDATED_EVENT = 'relaciona:oportunidades-updated';

export function getClientes(): Cliente[] {
  return MOCK_CLIENTES;
}

export function getUsuarios(): Usuario[] {
  return MOCK_USUARIOS;
}

export function populateOportunidade(oportunidade: Oportunidade): Oportunidade {
  const cliente = MOCK_CLIENTES.find((c) => c.id === oportunidade.tb_clientes_id);
  const usuario = MOCK_USUARIOS.find((u) => u.id === oportunidade.tb_usuarios_id);
  return {
    ...oportunidade,
    cliente,
    usuario,
  };
}

export function getOportunidades(): Oportunidade[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: Oportunidade[] = JSON.parse(saved);
      return parsed.map(populateOportunidade);
    }
  } catch (error) {
    console.error('Erro ao ler do localStorage:', error);
  }
  return MOCK_OPORTUNIDADES_INICIAIS.map(populateOportunidade);
}

export function saveOportunidades(lista: Oportunidade[]): void {
  try {
    // Salvamos apenas os dados puros (sem a recursão do populate)
    const raw = lista.map(({ cliente, usuario, ...rest }) => rest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(OPORTUNIDADES_UPDATED_EVENT));
    }
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
}


export const STATUS_CORES: Record<StatusOportunidade, { bg: string; text: string; border: string; dot: string }> = {
  'Prospecção': {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  'Qualificação': {
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'border-sky-200',
    dot: 'bg-sky-500',
  },
  'Proposta': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
  },
  'Negociação': {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    dot: 'bg-indigo-500',
  },
  'Fechado Ganho': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
  },
  'Fechado Perdido': {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    dot: 'bg-rose-500',
  },
};
