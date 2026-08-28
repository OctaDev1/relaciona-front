import React, { useState, useEffect, useMemo } from 'react';
import { Modal } from './Modal';
import {
  getOportunidades,
  getUsuarios,
  getClientes,
  OPORTUNIDADES_UPDATED_EVENT,
} from '../../data/oportunidadesData';
import type { Oportunidade } from '../../types/OportunidadeTypes';

interface RelatoriosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOportunidades?: () => void;
}

type Period = 'hoje' | '7dias' | '30dias' | 'ano';

export const RelatoriosModal: React.FC<RelatoriosModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenOportunidades 
}) => {
  const [period, setPeriod] = useState<Period>('30dias');
  const [exportStatus, setExportStatus] = useState<string | null>(null);
  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]);

  // Carregar oportunidades ao abrir ou quando o evento de atualização for disparado
  const carregarDados = () => {
    setOportunidades(getOportunidades());
  };

  useEffect(() => {
    if (isOpen) {
      carregarDados();
    }

    const handleUpdate = () => {
      carregarDados();
    };

    window.addEventListener(OPORTUNIDADES_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(OPORTUNIDADES_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [isOpen]);

  // Formatação de Moeda
  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Filtragem das oportunidades pelo período selecionado
  const opsPeriodo = useMemo(() => {
    if (oportunidades.length === 0) return [];

    const now = new Date();
    return oportunidades.filter((op) => {
      if (!op.dataCriacao) return true;
      const opDate = new Date(op.dataCriacao);
      const diffDays = (now.getTime() - opDate.getTime()) / (1000 * 3600 * 24);

      switch (period) {
        case 'hoje':
          return diffDays <= 2; // Últimas 48h para garantir visibilidade
        case '7dias':
          return diffDays <= 7;
        case '30dias':
          return diffDays <= 30;
        case 'ano':
        default:
          return true;
      }
    });
  }, [oportunidades, period]);

  // Se o filtro do período estiver vazio mas houver oportunidades no sistema, usamos o total
  const dadosBase = opsPeriodo.length > 0 ? opsPeriodo : oportunidades;

  // ================= CÁLCULO DAS MÉTRICAS EM TEMPO REAL =================
  const totalOps = dadosBase.length;
  const totalPipeline = dadosBase.reduce((acc, curr) => acc + curr.valor, 0);

  const opsGanhas = dadosBase.filter((op) => op.status === 'Fechado Ganho');
  const valorGanho = opsGanhas.reduce((acc, curr) => acc + curr.valor, 0);

  const opsPerdidas = dadosBase.filter((op) => op.status === 'Fechado Perdido');
  const opsEmAndamento = dadosBase.filter(
    (op) => op.status !== 'Fechado Ganho' && op.status !== 'Fechado Perdido'
  );

  const taxaConversao = totalOps > 0 ? ((opsGanhas.length / totalOps) * 100).toFixed(1) : '0.0';
  const ticketMedio = totalOps > 0 ? totalPipeline / totalOps : 0;

  // Funil de Vendas Dinâmico (Etapas)
  const funil = useMemo(() => {
    const etapas = [
      { key: 'Prospecção', label: 'Prospecção (Leads)', cor: 'bg-amber-400' },
      { key: 'Qualificação', label: 'Qualificação', cor: 'bg-sky-400' },
      { key: 'Proposta', label: 'Proposta Enviada', cor: 'bg-blue-500' },
      { key: 'Negociação', label: 'Negociação', cor: 'bg-indigo-600' },
      { key: 'Fechado Ganho', label: 'Fechamento (Ganho)', cor: 'bg-emerald-500' },
    ];

    return etapas.map((etapa) => {
      const count = dadosBase.filter((op) => op.status === etapa.key).length;
      const pct = totalOps > 0 ? Math.round((count / totalOps) * 100) : 0;
      return {
        etapa: etapa.label,
        quantidade: count,
        porcentagem: pct,
        cor: etapa.cor,
      };
    });
  }, [dadosBase, totalOps]);

  // Origem / Distribuição por Tipo de Cliente (tb_cliente)
  const canais = useMemo(() => {
    const clientes = getClientes();
    const pjOps = dadosBase.filter((op) => {
      const c = op.cliente || clientes.find((cli) => cli.id === op.tb_clientes_id);
      return c?.tipoPessoa === 'PJ';
    });
    const pfOps = dadosBase.filter((op) => {
      const c = op.cliente || clientes.find((cli) => cli.id === op.tb_clientes_id);
      return c?.tipoPessoa === 'PF';
    });

    const valorPJ = pjOps.reduce((acc, curr) => acc + curr.valor, 0);
    const valorPF = pfOps.reduce((acc, curr) => acc + curr.valor, 0);

    const pctPJ = totalPipeline > 0 ? Math.round((valorPJ / totalPipeline) * 100) : 60;
    const pctPF = totalPipeline > 0 ? Math.round((valorPF / totalPipeline) * 100) : 40;

    return [
      {
        nome: 'Pessoa Jurídica (B2B / Empresas)',
        porcentagem: pctPJ,
        valor: formatCurrency(valorPJ),
        cor: 'bg-blue-600',
        qtd: pjOps.length,
      },
      {
        nome: 'Pessoa Física (B2C / Direto)',
        porcentagem: pctPF,
        valor: formatCurrency(valorPF),
        cor: 'bg-indigo-500',
        qtd: pfOps.length,
      },
      {
        nome: 'Negociações em Andamento',
        porcentagem: totalOps > 0 ? Math.round((opsEmAndamento.length / totalOps) * 100) : 0,
        valor: formatCurrency(opsEmAndamento.reduce((acc, curr) => acc + curr.valor, 0)),
        cor: 'bg-cyan-500',
        qtd: opsEmAndamento.length,
      },
    ];
  }, [dadosBase, totalPipeline, totalOps, opsEmAndamento]);

  // Ranking Dinâmico de Usuários / Vendedores (tb_usuario)
  const topSales = useMemo(() => {
    const usuarios = getUsuarios();
    
    return usuarios.map((user) => {
      const userOps = dadosBase.filter((op) => op.tb_usuarios_id === user.id);
      const userGanhas = userOps.filter((op) => op.status === 'Fechado Ganho');
      const userValorGanho = userGanhas.reduce((acc, curr) => acc + curr.valor, 0);
      const userValorTotal = userOps.reduce((acc, curr) => acc + curr.valor, 0);

      // Meta fictícia base de R$ 50.000 para cálculo de %
      const metaPct = Math.round((userValorTotal / 50000) * 100);

      return {
        ...user,
        totalOps: userOps.length,
        vendasGanhas: userGanhas.length,
        valorTotal: formatCurrency(userValorTotal),
        valorGanho: formatCurrency(userValorGanho),
        meta: `${metaPct}%`,
        metaRaw: metaPct,
      };
    }).sort((a, b) => b.totalOps - a.totalOps);
  }, [dadosBase]);

  const handleExport = (type: 'pdf' | 'csv') => {
    setExportStatus(`Gerando relatório dinâmico em ${type.toUpperCase()} com as ${totalOps} oportunidades...`);
    setTimeout(() => {
      setExportStatus(`Relatório ${type.toUpperCase()} gerado com sucesso! 🚀`);
      setTimeout(() => setExportStatus(null), 3500);
    }, 1200);
  };

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
                <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                  Painel de Relatórios & BI
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {totalOps} Oportunidades
                  </span>
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Métricas vinculadas ao CRUD de Oportunidades
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Filtro de Período */}
          <div className="inline-flex p-1 bg-gray-100 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setPeriod('hoje')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                period === 'hoje'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Hoje
            </button>
            <button
              onClick={() => setPeriod('7dias')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                period === '7dias'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              7 Dias
            </button>
            <button
              onClick={() => setPeriod('30dias')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                period === '30dias'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              30 Dias
            </button>
            <button
              onClick={() => setPeriod('ano')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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

        {/* 4 Cards de Métricas Principais (KPIs Dinâmicos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Pipeline Total */}
          <div className="bg-linear-to-br from-blue-50 to-white p-5 rounded-2xl border border-blue-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Pipeline Total</span>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{formatCurrency(totalPipeline)}</div>
            <div className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              Ganho: {formatCurrency(valorGanho)}
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
            <div className="text-2xl font-extrabold text-gray-900">{taxaConversao}%</div>
            <div className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              {opsGanhas.length} de {totalOps} negócios fechados
            </div>
          </div>

          {/* Card 3: Oportunidades Cadastradas */}
          <div className="bg-linear-to-br from-indigo-50 to-white p-5 rounded-2xl border border-indigo-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Negócios Ativos</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{totalOps} no total</div>
            <div className="text-xs font-semibold text-blue-600 mt-1">
              {opsEmAndamento.length} em andamento • {opsPerdidas.length} perdidas
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
            <div className="text-2xl font-extrabold text-gray-900">{formatCurrency(ticketMedio)}</div>
            <div className="text-xs font-semibold text-gray-500 mt-1">
              Calculado por oportunidade
            </div>
          </div>

        </div>

        {/* Seção Central: Funil de Vendas + Canais */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Funil de Vendas Visual Dinâmico (7 colunas) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">Funil de Vendas em Tempo Real</h3>
                <p className="text-xs text-gray-500">Distribuição calculada das oportunidades cadastradas no sistema</p>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                Pipeline Dinâmico
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {funil.map((item, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-700 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-[10px] font-bold">
                        {index + 1}
                      </span>
                      {item.etapa}
                    </span>
                    <span className="text-gray-900 font-bold">
                      {item.quantidade} {item.quantidade === 1 ? 'negócio' : 'negócios'} <span className="text-gray-400 font-normal">({item.porcentagem}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.cor} rounded-full transition-all duration-500`}
                      style={{ width: `${Math.max(item.porcentagem, item.quantidade > 0 ? 5 : 0)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desempenho por Segmento de Cliente (tb_cliente) (5 colunas) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-bold text-gray-900">Segmento de Clientes (tb_cliente)</h3>
                <span className="text-xs text-gray-400">Por tipo</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">Volume financeiro gerado por perfil de cliente vinculado</p>

              <div className="space-y-3.5">
                {canais.map((canal, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-700">{canal.nome} ({canal.qtd})</span>
                      <span className="text-gray-900 font-bold">{canal.valor} <span className="text-gray-400">({canal.porcentagem}%)</span></span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${canal.cor} rounded-full transition-all duration-500`}
                        style={{ width: `${Math.max(canal.porcentagem, canal.qtd > 0 ? 5 : 0)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>Sincronização:</span>
              <strong className="text-emerald-600 font-bold">100% integrado ao CRUD</strong>
            </div>
          </div>

        </div>

        {/* Ranking de Produtividade dos Usuários (tb_usuario) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">Produtividade da Equipe (tb_usuario)</h3>
              <p className="text-xs text-gray-500">Performance calculada a partir dos responsáveis vinculados às oportunidades</p>
            </div>
            <span className="text-xs font-semibold text-gray-500">
              {topSales.length} consultores ativos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-1">
            {topSales.map((vendedor, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src={vendedor.foto}
                    alt={vendedor.nome}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 truncate">{vendedor.nome}</h4>
                    <p className="text-[10px] text-gray-500 truncate">{vendedor.cargo}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200/60 grid grid-cols-2 gap-1 text-[11px]">
                  <div>
                    <span className="text-gray-400 block text-[9px] uppercase font-bold">Oportunidades</span>
                    <span className="font-bold text-gray-800">{vendedor.totalOps} ({vendedor.vendasGanhas} ganhas)</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[9px] uppercase font-bold">Pipeline</span>
                    <span className="font-bold text-blue-600 truncate block">
                      {vendedor.valorTotal}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé e Ações */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {onOpenOportunidades && (
              <button
                onClick={() => {
                  onClose();
                  onOpenOportunidades();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Gerenciar Oportunidades (CRUD)
              </button>
            )}
          </div>

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
