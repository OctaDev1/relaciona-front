import React, { useEffect } from "react";

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        // iPhone SE (375px): backdrop com padding reduzido para não colar o card nas bordas
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 md:p-6"
            onClick={onClose}
        >
            {/* iPhone SE: card ocupa a largura toda com padding menor; md (iPad Mini 768px): card maior com largura e padding ampliados */}
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-sm md:max-w-xl p-4 sm:p-6 md:p-8 relative max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Fechar"
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="space-y-3 sm:space-y-4 pr-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">Sobre o Relaciona</h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        O Relaciona é uma aplicação de CRM (Customer Relationship Management) desenvolvida para auxiliar empresas no gerenciamento de clientes e oportunidades de negócio.
                        O sistema permite o cadastro, consulta, atualização e remoção de registros, proporcionando um controle mais eficiente das informações comerciais.
                        Entre as funcionalidades estão o gerenciamento de clientes, oportunidades de venda e usuários do sistema, facilitando o acompanhamento do relacionamento com clientes e do processo de negociação.
                    </p>
                    <ul className="text-gray-600 space-y-2 text-sm sm:text-md list-disc list-inside">
                        <li>Gestão completa de clientes e oportunidades</li>
                        <li>Relatórios e métricas em tempo real</li>
                        <li>Controle de permissões e trabalho colaborativo</li>
                        <li>Interface intuitiva e responsiva</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
