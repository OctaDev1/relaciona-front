
function Footer() {
  return (
    <div>
        <footer className="flex items-center justify-between px-8 md:px-16 py-8 bg-white border-t border-gray-200 mt-auto">
      
      {/* Esquerda: Logo */}
      <div className="flex-1 flex justify-start">
        <a href="/" className="flex flex-col items-center text-blue-500 font-bold text-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mb-1">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Relaciona
        </a>
      </div>

      {/* Centro: Links */}
      <nav className="flex-1 flex justify-center gap-8 text-sm text-gray-700">
        <a href="#" className="hover:text-blue-500 transition-colors">Termos</a>
        <a href="#" className="hover:text-blue-500 transition-colors">Privacidade</a>
        <a href="#" className="hover:text-blue-500 transition-colors">Suporte</a>
        <a href="#" className="hover:text-blue-500 transition-colors">Contato</a>
      </nav>

      {/* Direita: Copyright */}
      <div className="flex-1 flex justify-end text-sm text-gray-700">
        <span>&copy; 2024 Relaciona CRM - Academic Project</span>
      </div>

    </footer>
    </div>
  )
}

export default Footer