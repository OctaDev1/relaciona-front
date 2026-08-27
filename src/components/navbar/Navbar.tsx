import { useState, useEffect } from 'react';

function Navbar() {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      
      <header 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 transition-all duration-300 ${
          isScrolled 
            ? 'py-4 bg-white/85 backdrop-blur-md shadow-sm border-b border-transparent' 
            : 'py-6 bg-white border-b border-gray-200'
        }`}
      >
        
        {/* Esquerda: Logo */}
        <div className="flex-1 flex justify-start">
          <a href="/" className="flex flex-col items-center text-blue-500 font-bold text-sm hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mb-1">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Relaciona
          </a>
        </div>

        {/* Centro: Links de Navegação */}
        <nav className="flex-1 flex justify-center gap-10 font-medium text-sm md:text-base">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Introdução</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Sobre</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</a>
        </nav>

        {/* Direita: Ícone de Perfil */}
        <div className="flex-1 flex justify-end items-center">
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="10" r="3"></circle>
              <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
            </svg>
          </button>
        </div>
      </header>
      <div className="h-22.5"></div>
    </>
  );
}

export default Navbar;