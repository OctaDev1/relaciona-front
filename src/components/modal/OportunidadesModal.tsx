import React, { useState, useEffect, useMemo } from 'react';
import { Modal } from './Modal';
import type { Oportunidade, StatusOportunidade, OportunidadeFormData } from '../../types/OportunidadeTypes';
import {
  getClientes,
  getUsuarios,
  getOportunidades,
  saveOportunidades,
  populateOportunidade,
  STATUS_CORES,
} from '../../data/oportunidadesData';

interface OportunidadesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TODAS_ETAPAS: StatusOportunidade[] = [
  'Prospecção',
  'Qualificação',
  'Proposta',
  'Negociação',
  'Fechado Ganho',
  'Fechado Perdido',
];

export const OportunidadesModal: React.FC<OportunidadesModalProps> = ({ isOpen, onClose }) => {
  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('TODOS');
  const [viewMode, setViewMode] = useState<'lista' | 'kanban'>('kanban');

  // Estado do Formulário (Criar / Editar)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<OportunidadeFormData>({
    titulo: '',
    valor: 0,
    status: 'Prospecção',
    tb_clientes_id: 1,
    tb_usuarios_id: 1,
    dataCriacao: new Date().toISOString().split('T')[0],
    dataFechamento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Estado de Confirmação de Exclusão
  const [deletingOportunidade, setDeletingOportunidade] = useState<Oportunidade | null>(null);

  // Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const clientes = useMemo(() => getClientes(), []);
  const usuarios = useMemo(() => getUsuarios(), []);

  // Carregar dados ao abrir
  useEffect(() => {
    if (isOpen) {
      setOportunidades(getOportunidades());
    }
  }, [isOpen]);

  // Filtragem
  const filteredOportunidades = useMemo(() => {
    return oportunidades.filter((op) => {
      const matchSearch =
        op.titulo.toLowerCase().includes(search.toLowerCase()) ||
        (op.cliente?.nomeCompleto && op.cliente.nomeCompleto.toLowerCase().includes(search.toLowerCase())) ||
        (op.usuario?.nome && op.usuario.nome.toLowerCase().includes(search.toLowerCase()));

      const matchStatus = statusFilter === 'TODOS' || op.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [oportunidades, search, statusFilter]);

  // Cálculos de Resumo (KPIs)
  const totalPipeline = useMemo(() => {
    return oportunidades.reduce((acc, curr) => acc + curr.valor, 0);
  }, [oportunidades]);

  const totalGanhas = useMemo(() => {
    return oportunidades.filter((op) => op.status === 'Fechado Ganho').length;
  }, [oportunidades]);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  // Handlers do Formulário
  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      titulo: '',
      valor: 10000,
      status: 'Prospecção',
      tb_clientes_id: clientes[0]?.id || 1,
      tb_usuarios_id: usuarios[0]?.id || 1,
      dataCriacao: new Date().toISOString().split('T')[0],
      dataFechamento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (op: Oportunidade) => {
    setEditingId(op.id);
    setFormData({
      titulo: op.titulo,
      valor: op.valor,
      status: op.status,
      tb_clientes_id: op.tb_clientes_id,
      tb_usuarios_id: op.tb_usuarios_id,
      dataCriacao: op.dataCriacao,
      dataFechamento: op.dataFechamento,
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo.trim()) {
      setFormError('Por favor, informe o título da oportunidade.');
      return;
    }
    if (formData.valor <= 0) {
      setFormError('O valor deve ser maior que zero.');
      return;
    }
    if (!formData.tb_clientes_id) {
      setFormError('Selecione um cliente vinculado (tb_cliente).');
      return;
    }
    if (!formData.tb_usuarios_id) {
      setFormError('Selecione um usuário responsável (tb_usuario).');
      return;
    }

    let updatedList: Oportunidade[];

    if (editingId) {
      // Atualização
      updatedList = oportunidades.map((op) => {
        if (op.id === editingId) {
          const updatedRaw: Oportunidade = {
            ...op,
            ...formData,
          };
          return populateOportunidade(updatedRaw);
        }
        return op;
      });
      showToast('Oportunidade atualizada com sucesso! ✅');
    } else {
      // Criação
      const newId = oportunidades.length > 0 ? Math.max(...oportunidades.map((o) => o.id)) + 1 : 1;
      const newRaw: Oportunidade = {
        id: newId,
        ...formData,
      };
      const populated = populateOportunidade(newRaw);
      updatedList = [populated, ...oportunidades];
      showToast('Nova oportunidade cadastrada com sucesso! 🚀');
    }

    setOportunidades(updatedList);
    saveOportunidades(updatedList);
    setIsFormOpen(false);
  };

  // Handler de Exclusão
  const handleConfirmDelete = () => {
    if (!deletingOportunidade) return;
    const updated = oportunidades.filter((op) => op.id !== deletingOportunidade.id);
    setOportunidades(updated);
    saveOportunidades(updated);
    setDeletingOportunidade(null);
    showToast('Oportunidade removida com sucesso! 🗑️');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-6xl">
      <div className="space-y-6">
        
        {/* ================= TOPO / HEADER ================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-5 pr-10">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  <line x1="12" y1="11" x2="12" y2="17"></line>
                  <line x1="9" y1="14" x2="15" y2="14"></line>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
                  Gestão de Oportunidades
                </h2>
              </div>
            </div>
          </div>

          {/* Botão de Adicionar Nova Oportunidade */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Nova Oportunidade
            </button>
          </div>
        </div>

        {/* ================= TOAST DE NOTIFICAÇÃO ================= */}
        {toastMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-emerald-600">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              {toastMessage}
            </div>
          </div>
        )}

        {/* ================= RESUMO DE MÉTRICAS (KPIs RÁPIDOS) ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Total Oportunidades</span>
            <span className="text-xl font-extrabold text-gray-900">{oportunidades.length}</span>
          </div>

          <div className="bg-blue-50/80 p-3.5 rounded-2xl border border-blue-100">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">Pipeline Total</span>
            <span className="text-xl font-extrabold text-blue-700">{formatCurrency(totalPipeline)}</span>
          </div>

          <div className="bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-100">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">Negócios Ganhos</span>
            <span className="text-xl font-extrabold text-emerald-700">{totalGanhas}</span>
          </div>

          <div className="bg-purple-50/80 p-3.5 rounded-2xl border border-purple-100">
            <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block mb-1">Ticket Médio</span>
            <span className="text-xl font-extrabold text-purple-700">
              {oportunidades.length > 0 ? formatCurrency(totalPipeline / oportunidades.length) : 'R$ 0,00'}
            </span>
          </div>
        </div>

        {/* ================= BARRA DE BUSCA, FILTROS E MODO DE VISUALIZAÇÃO ================= */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-200/70">
          
          {/* Campo de Busca */}
          <div className="relative flex-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Buscar por título, cliente ou responsável..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-2 text-xs md:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-800 placeholder-gray-400 transition-all"
            />
          </div>

          {/* Filtro por Status */}
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white px-3 py-2 text-xs md:text-sm rounded-xl border border-gray-200 text-gray-700 font-semibold focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
            >
              <option value="TODOS">Todos os Status</option>
              {TODAS_ETAPAS.map((etapa) => (
                <option key={etapa} value={etapa}>
                  {etapa}
                </option>
              ))}
            </select>

            {/* Alternador de Visão: Lista / Kanban */}
            <div className="inline-flex p-0.5 bg-gray-200 rounded-xl">
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'kanban' ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Visualização em Colunas Kanban"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <rect x="3" y="3" width="7" height="18" rx="1"></rect>
                  <rect x="14" y="3" width="7" height="18" rx="1"></rect>
                </svg>
              </button>
              <button
                onClick={() => setViewMode('lista')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'lista' ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Visualização em Tabela / Lista"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* ================= CONTEÚDO PRINCIPAL (KANBAN OU LISTA) ================= */}
        {filteredOportunidades.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center mb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h4 className="text-sm font-bold text-gray-800 mb-1">Nenhuma oportunidade encontrada</h4>
            <p className="text-xs text-gray-500 mb-4">Tente ajustar os filtros ou cadastre uma nova oportunidade.</p>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              Criar Nova Oportunidade
            </button>
          </div>
        ) : viewMode === 'kanban' ? (
          /* ================= VISUALIZAÇÃO KANBAN ================= */
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3.5 overflow-x-auto pb-2">
            {TODAS_ETAPAS.map((etapa) => {
              const itensDaEtapa = filteredOportunidades.filter((op) => op.status === etapa);
              const valorEtapa = itensDaEtapa.reduce((acc, curr) => acc + curr.valor, 0);
              const cores = STATUS_CORES[etapa];

              return (
                <div
                  key={etapa}
                  className="bg-gray-50/70 rounded-2xl p-3 border border-gray-200/70 flex flex-col min-w-50"
                >
                  {/* Cabeçalho da Coluna Kanban */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${cores.dot}`}></span>
                      <h4 className="text-xs font-bold text-gray-800">{etapa}</h4>
                    </div>
                    <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-gray-200/80 text-gray-700">
                      {itensDaEtapa.length}
                    </span>
                  </div>
                  <div className="text-[10px] font-semibold text-gray-400 mb-3">
                    {formatCurrency(valorEtapa)}
                  </div>

                  {/* Cards dentro da Coluna */}
                  <div className="space-y-2.5 flex-1">
                    {itensDaEtapa.map((op) => (
                      <div
                        key={op.id}
                        className="bg-white p-3 rounded-xl border border-gray-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between gap-2.5 group"
                      >
                        {/* Título & Valor */}
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h5 className="text-xs font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                              {op.titulo}
                            </h5>
                          </div>
                          <span className="text-xs font-extrabold text-blue-600 block mt-1">
                            {formatCurrency(op.valor)}
                          </span>
                        </div>

                        {/* Cliente Relacionado (tb_cliente) */}
                        <div className="bg-gray-50 p-2 rounded-lg text-[11px] border border-gray-100">
                          <span className="text-gray-400 block text-[9px] uppercase font-bold">Cliente</span>
                          <span className="font-semibold text-gray-800 truncate block" title={op.cliente?.nomeCompleto}>
                            {op.cliente?.nomeCompleto || 'Cliente não encontrado'}
                          </span>
                          <span className="text-[10px] text-gray-500 block">
                            {op.cliente?.tipoPessoa === 'PJ' ? op.cliente.cnpj : op.cliente?.cpf}
                          </span>
                        </div>

                        {/* Usuário Responsável (tb_usuario) & Ações */}
                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0" title={`${op.usuario?.nome} (${op.usuario?.cargo})`}>
                            {op.usuario?.foto ? (
                              <img
                                src={op.usuario.foto}
                                alt={op.usuario.nome}
                                className="w-5 h-5 rounded-full object-cover border border-blue-400 shrink-0"
                              />
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[9px] font-bold shrink-0">
                                {op.usuario?.nome.charAt(0)}
                              </div>
                            )}
                            <span className="text-[10px] font-medium text-gray-600 truncate">
                              {op.usuario?.nome.split(' ')[0]}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => handleOpenEdit(op)}
                              className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                              title="Editar Oportunidade"
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                            </button>
                            <button
                              onClick={() => setDeletingOportunidade(op)}
                              className="p-1 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                              title="Excluir Oportunidade"
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* ================= VISUALIZAÇÃO EM TABELA / LISTA ================= */
          <div className="overflow-x-auto border border-gray-200 rounded-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Oportunidade (Título / Valor)</th>
                  <th className="py-3 px-4">Cliente (tb_cliente)</th>
                  <th className="py-3 px-4">Responsável (tb_usuario)</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Criação / Fechamento</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {filteredOportunidades.map((op) => {
                  const cores = STATUS_CORES[op.status];
                  return (
                    <tr key={op.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-900 text-sm">{op.titulo}</div>
                        <div className="font-extrabold text-blue-600">{formatCurrency(op.valor)}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-800">{op.cliente?.nomeCompleto}</div>
                        <div className="text-[11px] text-gray-500">
                          {op.cliente?.email} • {op.cliente?.tipoPessoa}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={op.usuario?.foto}
                            alt={op.usuario?.nome}
                            className="w-7 h-7 rounded-full object-cover border border-blue-500 shrink-0"
                          />
                          <div>
                            <div className="font-semibold text-gray-900 leading-tight">{op.usuario?.nome}</div>
                            <div className="text-[10px] text-gray-400">{op.usuario?.cargo}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cores.bg} ${cores.text} ${cores.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cores.dot}`}></span>
                          {op.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-gray-600 text-[11px]">
                        <div>Criado: {formatDate(op.dataCriacao)}</div>
                        <div className="text-gray-400">Previsão: {formatDate(op.dataFechamento)}</div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(op)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Editar"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => setDeletingOportunidade(op)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Excluir"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ================= MODAL DE FORMULÁRIO (CRIAR / EDITAR) ================= */}
        {isFormOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white w-full max-w-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100 space-y-5 animate-in zoom-in-95 duration-150">
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    {editingId ? '✏️' : '➕'}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {editingId ? 'Editar Oportunidade' : 'Cadastrar Nova Oportunidade'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Preencha os dados e vincule aos registros de cliente e usuário.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
                  ⚠️ {formError}
                </div>
              )}

              <form onSubmit={handleSaveForm} className="space-y-4">
                {/* Título da Oportunidade (VARCHAR(50)) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Título da Oportunidade <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={50}
                    placeholder="Ex: Expansão de Contrato Enterprise"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                  <span className="text-[10px] text-gray-400 block mt-0.5 text-right">
                    {formData.titulo.length}/50 caracteres
                  </span>
                </div>

                {/* Valor & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Valor Estimado (R$) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.valor}
                      onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Etapa / Status <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as StatusOportunidade })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
                    >
                      {TODAS_ETAPAS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Relacionamento 1: tb_cliente */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Cliente Vinculado (<code className="text-blue-600">tb_cliente</code>) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.tb_clientes_id}
                    onChange={(e) => setFormData({ ...formData, tb_clientes_id: parseInt(e.target.value) })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
                  >
                    {clientes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nomeCompleto} ({c.tipoPessoa === 'PJ' ? `CNPJ: ${c.cnpj}` : `CPF: ${c.cpf}`})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Relacionamento 2: tb_usuario */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Responsável Comercial (<code className="text-blue-600">tb_usuario</code>) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.tb_usuarios_id}
                    onChange={(e) => setFormData({ ...formData, tb_usuarios_id: parseInt(e.target.value) })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
                  >
                    {usuarios.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.nome} — {u.cargo} ({u.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Datas: dataCriacao e dataFechamento */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Data de Criação <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.dataCriacao}
                      onChange={(e) => setFormData({ ...formData, dataCriacao: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Previsão de Fechamento <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.dataFechamento}
                      onChange={(e) => setFormData({ ...formData, dataFechamento: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Botões do Formulário */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer"
                  >
                    {editingId ? 'Salvar Alterações' : 'Criar Oportunidade'}
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* ================= MODAL DE CONFIRMAÇÃO DE EXCLUSÃO ================= */}
        {deletingOportunidade && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-gray-100 space-y-4 animate-in zoom-in-95 duration-150 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center text-xl">
                🗑️
              </div>
              <h3 className="text-base font-bold text-gray-900">
                Confirmar Exclusão de Oportunidade
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Você tem certeza que deseja excluir a oportunidade <strong className="text-gray-900 font-bold">"{deletingOportunidade.titulo}"</strong> ({formatCurrency(deletingOportunidade.valor)})?
              </p>
              <div className="pt-3 flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeletingOportunidade(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer"
                >
                  Sim, Excluir
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
};
