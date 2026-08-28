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
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Fechar"
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-blue-600">Sobre o Relaciona</h2>
                    <p className="text-gray-600 leading-relaxed">
                        O Relaciona é um CRM desenvolvido para dar controle total da operação comercial da sua empresa,
                        unindo gestão de clientes, oportunidades de venda e métricas em tempo real numa única plataforma.
                    </p>
                    <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• Gestão completa de clientes e oportunidades</li>
                        <li>• Relatórios e métricas em tempo real</li>
                        <li>• Controle de permissões e trabalho colaborativo</li>
                        <li>• Integração via API REST</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
