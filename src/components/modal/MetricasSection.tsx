import React, { useState } from 'react';
import { RelatoriosModal } from './RelatoriosModal';

export const MetricasSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <section className="relative min-h-screen bg-[#F0F5FF] flex items-center justify-center p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Lado Esquerdo */}
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold text-[#0055FF]">
            Dados Precisos
          </h1>
          <p className="text-2xl font-bold text-gray-800 leading-snug">
            Tome decisões baseadas em relatórios gerados em tempo real.
          </p>
          
          {/* Botão "Ver relatórios" com tipagem de clique */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 text-[#0055FF] font-semibold text-lg hover:underline transition-all cursor-pointer"
          >
            Ver relatórios
            <span className="text-xl">›</span>
          </button>
        </div>

        {/* Lado Direito */}
        <div className="bg-[#E2EAFF] rounded-3xl p-16 flex items-center justify-center shadow-lg h-80">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
            <div className="flex items-end gap-1.5 h-8">
              <span className="w-1.5 h-4 bg-[#0055FF] rounded-full"></span>
              <span className="w-1.5 h-8 bg-[#0055FF] rounded-full"></span>
              <span className="w-1.5 h-6 bg-[#0055FF] rounded-full"></span>
            </div>
          </div>
        </div>

      </div>

      {/* Instância da Modal de Relatórios */}
      <RelatoriosModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};