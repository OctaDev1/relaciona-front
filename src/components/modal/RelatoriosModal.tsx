import React, { useState } from 'react';
import { Modal } from './Modal';
import { TEAM_MEMBERS } from '../../data/HomeData';

interface RelatoriosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Period = 'hoje' | '7dias' | '30dias' | 'ano';

interface MetricsData {
  receita: string;
  receitaCrescimento: string;
  conversao: string;
  conversaoCrescimento: string;
  oportunidades: string;
  oportunidadesNovas: string;
  ticketMedio: string;
  ticketCrescimento: string;
  funil: {
    etapa: string;
    quantidade: number;
    porcentagem: number;
    cor: string;
  }[];
  canais: {
    nome: string;
    porcentagem: number;
    valor: string;
    cor: string;
  }[];
}

const DADOS_POR_PERIODO: Record<Period, MetricsData> = {
  hoje: {
    receita: 'R$ 18.450,00',
    receitaCrescimento: '+12.5% vs ontem',
    conversao: '36.4%',
    conversaoCrescimento: '+2.1% hoje',
    oportunidades: '14 negócios',
    oportunidadesNovas: '4 fechados hoje',
    ticketMedio: 'R$ 4.612,50',
    ticketCrescimento: '+5.4%',
    funil: [
      { etapa: 'Prospecção (Leads)', quantidade: 48, porcentagem: 100, cor: 'bg-blue-300' },
      { etapa: 'Qualificação', quantidade: 32, porcentagem: 66, cor: 'bg-blue-400' },
      { etapa: 'Proposta Enviada', quantidade: 18, porcentagem: 37, cor: 'bg-blue-500' },
      { etapa: 'Negociação', quantidade: 9, porcentagem: 18, cor: 'bg-blue-600' },
      { etapa: 'Fechamento (Ganho)', quantidade: 4, porcentagem: 8, cor: 'bg-emerald-500' },
    ],
    canais: [
      { nome: 'Inbound / Site', porcentagem: 45, valor: 'R$ 8.300', cor: 'bg-blue-600' },
      { nome: 'Tráfego Pago (Ads)', porcentagem: 30, valor: 'R$ 5.535', cor: 'bg-indigo-500' },
      { nome: 'Outbound Comercial', porcentagem: 15, valor: 'R$ 2.767', cor: 'bg-cyan-500' },
      { nome: 'Indicações', porcentagem: 10, valor: 'R$ 1.848', cor: 'bg-emerald-500' },
    ],
  },
  '7dias': {
    receita: 'R$ 112.800,00',
    receitaCrescimento: '+15.2% vs semana anterior',
    conversao: '34.8%',
    conversaoCrescimento: '+3.4%',
    oportunidades: '86 negócios',
    oportunidadesNovas: '28 fechados',
    ticketMedio: 'R$ 4.028,00',
    ticketCrescimento: '+4.1%',
    funil: [
      { etapa: 'Prospecção (Leads)', quantidade: 310, porcentagem: 100, cor: 'bg-blue-300' },
      { etapa: 'Qualificação', quantidade: 198, porcentagem: 64, cor: 'bg-blue-400' },
      { etapa: 'Proposta Enviada', quantidade: 102, porcentagem: 33, cor: 'bg-blue-500' },
      { etapa: 'Negociação', quantidade: 54, porcentagem: 17, cor: 'bg-blue-600' },
      { etapa: 'Fechamento (Ganho)', quantidade: 28, porcentagem: 9, cor: 'bg-emerald-500' },
    ],
    canais: [
      { nome: 'Inbound / Site', porcentagem: 42, valor: 'R$ 47.376', cor: 'bg-blue-600' },
      { nome: 'Tráfego Pago (Ads)', porcentagem: 28, valor: 'R$ 31.584', cor: 'bg-indigo-500' },
      { nome: 'Outbound Comercial', porcentagem: 18, valor: 'R$ 20.304', cor: 'bg-cyan-500' },
      { nome: 'Indicações', porcentagem: 12, valor: 'R$ 13.536', cor: 'bg-emerald-500' },
    ],
  },
  '30dias': {
    receita: 'R$ 485.200,00',
    receitaCrescimento: '+18.4% vs mês anterior',
    conversao: '32.8%',
    conversaoCrescimento: '+4.2%',
    oportunidades: '342 negócios',
    oportunidadesNovas: '124 fechados',
    ticketMedio: 'R$ 3.912,00',
    ticketCrescimento: '+6.8%',
    funil: [
      { etapa: 'Prospecção (Leads)', quantidade: 1450, porcentagem: 100, cor: 'bg-blue-300' },
      { etapa: 'Qualificação', quantidade: 870, porcentagem: 60, cor: 'bg-blue-400' },
      { etapa: 'Proposta Enviada', quantidade: 410, porcentagem: 28, cor: 'bg-blue-500' },
      { etapa: 'Negociação', quantidade: 215, porcentagem: 15, cor: 'bg-blue-600' },
      { etapa: 'Fechamento (Ganho)', quantidade: 124, porcentagem: 8.5, cor: 'bg-emerald-500' },
    ],
    canais: [
      { nome: 'Inbound / Site', porcentagem: 42, valor: 'R$ 203.784', cor: 'bg-blue-600' },
      { nome: 'Tráfego Pago (Ads)', porcentagem: 28, valor: 'R$ 135.856', cor: 'bg-indigo-500' },
      { nome: 'Outbound Comercial', porcentagem: 18, valor: 'R$ 87.336', cor: 'bg-cyan-500' },
      { nome: 'Indicações', porcentagem: 12, valor: 'R$ 58.224', cor: 'bg-emerald-500' },
    ],
  },
  ano: {
    receita: 'R$ 5.420.000,00',
    receitaCrescimento: '+34.6% vs ano anterior',
    conversao: '35.1%',
    conversaoCrescimento: '+6.5%',
    oportunidades: '3.840 negócios',
    oportunidadesNovas: '1.380 fechados',
    ticketMedio: 'R$ 3.927,00',
    ticketCrescimento: '+11.2%',
    funil: [
      { etapa: 'Prospecção (Leads)', quantidade: 16200, porcentagem: 100, cor: 'bg-blue-300' },
      { etapa: 'Qualificação', quantidade: 10040, porcentagem: 62, cor: 'bg-blue-400' },
      { etapa: 'Proposta Enviada', quantidade: 4860, porcentagem: 30, cor: 'bg-blue-500' },
      { etapa: 'Negociação', quantidade: 2430, porcentagem: 15, cor: 'bg-blue-600' },
      { etapa: 'Fechamento (Ganho)', quantidade: 1380, porcentagem: 8.5, cor: 'bg-emerald-500' },
    ],
    canais: [
      { nome: 'Inbound / Site', porcentagem: 44, valor: 'R$ 2.384.800', cor: 'bg-blue-600' },
      { nome: 'Tráfego Pago (Ads)', porcentagem: 26, valor: 'R$ 1.409.200', cor: 'bg-indigo-500' },
      { nome: 'Outbound Comercial', porcentagem: 17, valor: 'R$ 921.400', cor: 'bg-cyan-500' },
      { nome: 'Indicações', porcentagem: 13, valor: 'R$ 704.600', cor: 'bg-emerald-500' },
    ],
  },
};

export const RelatoriosModal: React.FC<RelatoriosModalProps> = ({ isOpen, onClose }) => {
  const [period, setPeriod] = useState<Period>('30dias');
  const [exportStatus, setExportStatus] = useState<string | null>(null);

  const data = DADOS_POR_PERIODO[period];

  const handleExport = (type: 'pdf' | 'csv') => {
    setExportStatus(`Exportando relatório em ${type.toUpperCase()}...`);
    setTimeout(() => {
      setExportStatus(`Relatório ${type.toUpperCase()} gerado com sucesso! 🚀`);
      setTimeout(() => setExportStatus(null), 3000);
    }, 1200);
  };

  // Pegamos os 4 primeiros membros da equipe para o ranking de vendedores
  const topSales = [
    { ...TEAM_MEMBERS[0], vendas: 38, total: 'R$ 148.500', meta: '118%' },
    { ...TEAM_MEMBERS[3], vendas: 33, total: 'R$ 129.000', meta: '104%' },
    { ...TEAM_MEMBERS[4], vendas: 29, total: 'R$ 113.200', meta: '95%' },
    { ...TEAM_MEMBERS[5], vendas: 24, total: 'R$ 94.500', meta: '88%' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-5xl">
      <div className="space-y-8">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6 pr-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">
                  Painel de Relatórios & BI
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Sincronizado em tempo real
                  </span>
                  <span className="text-xs text-gray-400">Relaciona CRM Analytics</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filtro de Período */}
          <div className="inline-flex p-1 bg-gray-100 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setPeriod('hoje')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                period === 'hoje'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Hoje
            </button>
            <button
              onClick={() => setPeriod('7dias')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                period === '7dias'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              7 Dias
            </button>
            <button
              onClick={() => setPeriod('30dias')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                period === '30dias'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              30 Dias
            </button>
            <button
              onClick={() => setPeriod('ano')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                period === 'ano'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Este Ano
            </button>
          </div>
        </div>

        {/* Notificação de Exportação */}
        {exportStatus && (
          <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-sm font-medium flex items-center justify-between animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-blue-600">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              {exportStatus}
            </div>
          </div>
        )}

        {/* 4 Cards de Métricas Principais (KPIs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Faturamento */}
          <div className="bg-linear-to-br from-blue-50 to-white p-5 rounded-2xl border border-blue-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Receita Total</span>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{data.receita}</div>
            <div className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              {data.receitaCrescimento}
            </div>
          </div>

          {/* Card 2: Conversão */}
          <div className="bg-linear-to-br from-cyan-50 to-white p-5 rounded-2xl border border-cyan-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">Taxa de Conversão</span>
              <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{data.conversao}</div>
            <div className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              {data.conversaoCrescimento}
            </div>
          </div>

          {/* Card 3: Oportunidades */}
          <div className="bg-linear-to-br from-indigo-50 to-white p-5 rounded-2xl border border-indigo-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Oportunidades</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{data.oportunidades}</div>
            <div className="text-xs font-semibold text-blue-600 mt-1">
              {data.oportunidadesNovas}
            </div>
          </div>

          {/* Card 4: Ticket Médio */}
          <div className="bg-linear-to-br from-sky-50 to-white p-5 rounded-2xl border border-sky-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Ticket Médio</span>
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{data.ticketMedio}</div>
            <div className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              {data.ticketCrescimento}
            </div>
          </div>

        </div>

        {/* Seção Central: Funil de Vendas + Canais */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Funil de Vendas Visual (7 colunas) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">Funil de Vendas & Conversão</h3>
                <p className="text-xs text-gray-500">Volume e taxa de retenção por etapa do pipeline comercial</p>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                Pipeline Ativo
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {data.funil.map((item, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-700 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-[10px] font-bold">
                        {index + 1}
                      </span>
                      {item.etapa}
                    </span>
                    <span className="text-gray-900 font-bold">
                      {item.quantidade.toLocaleString('pt-BR')} <span className="text-gray-400 font-normal">({item.porcentagem}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.cor} rounded-full transition-all duration-500`}
                      style={{ width: `${item.porcentagem}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desempenho por Canal de Aquisição (5 colunas) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-bold text-gray-900">Origem das Vendas</h3>
                <span className="text-xs text-gray-400">Por canal</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">Distribuição de receita por fonte de captação</p>

              <div className="space-y-3.5">
                {data.canais.map((canal, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-700">{canal.nome}</span>
                      <span className="text-gray-900 font-bold">{canal.valor} <span className="text-gray-400">({canal.porcentagem}%)</span></span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${canal.cor} rounded-full transition-all duration-500`}
                        style={{ width: `${canal.porcentagem}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>Melhor canal do período:</span>
              <strong className="text-blue-600 font-bold">Inbound Marketing (42%)</strong>
            </div>
          </div>

        </div>

        {/* Ranking de Produtividade da Equipe */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">Destaques da Equipe Comercial</h3>
              <p className="text-xs text-gray-500">Desempenho individual e cumprimento de metas no período selecionado</p>
            </div>
            <span className="text-xs font-semibold text-gray-500">
              4 principais consultores
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            {topSales.map((vendedor, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={vendedor.imageUrl}
                    alt={vendedor.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-blue-500 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{vendedor.name}</h4>
                    <p className="text-[11px] text-gray-500 truncate">{vendedor.role}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200/60 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Fechamentos</span>
                    <span className="font-bold text-gray-800">{vendedor.vendas} vendas</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Meta</span>
                    <span className={`font-bold ${parseInt(vendedor.meta) >= 100 ? 'text-emerald-600' : 'text-blue-600'}`}>
                      {vendedor.meta}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé e Ações */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            * Dados consolidados e criptografados pela infraestrutura Relaciona CRM.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => handleExport('csv')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Exportar CSV
            </button>

            <button
              onClick={() => handleExport('pdf')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Baixar Relatório (PDF)
            </button>
          </div>
        </div>

      </div>
    </Modal>
  );
};
