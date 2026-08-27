
function Footer() {

  const anoAtual = new Date().getFullYear();

  return (
    
    <footer className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 px-8 md:px-16 py-10 bg-white border-t border-gray-200 mt-auto w-full">
      

      <div className="flex-1 flex justify-center md:justify-start w-full">
    
        <a href="/" className="flex flex-col items-center text-blue-500 font-bold text-sm hover:scale-105 transition-transform duration-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mb-1">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Relaciona
        </a>
      </div>

 
      <nav className="flex-1 flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-medium text-gray-500 w-full">
        <a href="#" className="hover:text-blue-600 transition-colors">Termos</a>
        <a href="#" className="hover:text-blue-600 transition-colors">Privacidade</a>
        <a href="#" className="hover:text-blue-600 transition-colors">Suporte</a>
        <a href="#" className="hover:text-blue-600 transition-colors">Contato</a>
      </nav>

      <div className="flex-1 flex justify-center md:justify-end text-sm text-gray-400 w-full text-center md:text-right">
        <span>&copy; {anoAtual} Relaciona CRM - Academic Project</span>
      </div>

    </footer>
  );
}

export default Footer;