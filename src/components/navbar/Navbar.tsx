
function Navbar() {
  return (
    <div>
        <header className="flex items-center justify-between px-8 md:px-16 py-6 bg-white border-b border-gray-200">
            <div className="flex-1 flex justify-start">
        <a href="/" className="flex flex-col items-center text-blue-500 font-bold text-sm">
          {/* Substitua o SVG abaixo pela tag <img /> do seu logo se preferir */}
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
      <nav className="flex-1 flex justify-center gap-10 font-medium">
        <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">Home</a>
        <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">Introdução</a>
        {/* Adicionando a cor azul para simular a rota ativa */}
        <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">Sobre</a>
      </nav>

      {/* Direita: Ícone de Perfil */}
      <div className="flex-1 flex justify-end items-center">
        <button className="text-gray-700 hover:text-blue-500 transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="10" r="3"></circle>
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
          </svg>
        </button>
      </div>
        </header>


    </div>
  )
}

export default Navbar