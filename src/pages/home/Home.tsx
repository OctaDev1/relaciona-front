import React, { useRef, useState, useEffect } from 'react';

// --- TIPAGENS ---
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface TestimonialCardProps {
  company: string;
  quote: string;
  author: string;
  role: string;
}

type TabId = 'relaciona' | 'oportunidades' | 'metricas' | 'equipe';

interface TabData {
  id: TabId;
  label: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageGradient: string;
}

// --- DADOS DAS ABAS ---
const TABS: TabData[] = [
  {
    id: 'relaciona',
    label: 'Relaciona CRM',
    title: 'Relaciona',
    subtitle: 'Controle total da sua operação comercial.',
    ctaText: 'Conheça o sistema',
    ctaLink: '#',
    imageGradient: 'from-blue-100 to-blue-50'
  },
  {
    id: 'oportunidades',
    label: 'Oportunidades',
    title: 'Gestão de Vendas',
    subtitle: 'Acompanhe cada etapa do seu funil e feche mais negócios.',
    ctaText: 'Explorar funil',
    ctaLink: '#',
    imageGradient: 'from-cyan-100 to-blue-50'
  },
  {
    id: 'metricas',
    label: 'Métricas e BI',
    title: 'Dados Precisos',
    subtitle: 'Tome decisões baseadas em relatórios gerados em tempo real.',
    ctaText: 'Ver relatórios',
    ctaLink: '#',
    imageGradient: 'from-indigo-100 to-blue-50'
  },
  {
    id: 'equipe',
    label: 'Gestão de Equipe',
    title: 'Trabalho Colaborativo',
    subtitle: 'Organize permissões, delegue tarefas e unifique seu time.',
    ctaText: 'Gerenciar time',
    ctaLink: '#',
    imageGradient: 'from-sky-100 to-white'
  }
];

// --- RENDERIZADOR DE ÍCONES ---
const getTabIcon = (tabId: TabId) => {
  switch(tabId) {
    case 'relaciona': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
    case 'oportunidades': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>;
    case 'metricas': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
    case 'equipe': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
  }
};

// --- COMPONENTES MENORES ---
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col cursor-pointer">
      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed flex-grow">{description}</p>
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ company, quote, author, role }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-blue-400/50 transition-all duration-300 h-full flex flex-col">
      <div className="text-blue-400 font-extrabold text-xl mb-6 tracking-wide flex items-center gap-2">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        {company}
      </div>
      <p className="text-gray-300 italic mb-8 flex-grow text-lg leading-relaxed">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-white font-bold">
          {author.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-white">{author}</p>
          <p className="text-sm text-blue-300">{role}</p>
        </div>
      </div>
    </div>
  );
};

// --- PÁGINA PRINCIPAL ---
export default function Home() {
  const trackRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const featureCarouselRef = useRef<HTMLDivElement>(null);
  const testimonialCarouselRef = useRef<HTMLDivElement>(null);

  // Calcula o progresso do scroll vertical para converter em movimento horizontal
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const { top, height } = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollableDistance = height - windowHeight;
      let progress = -top / scrollableDistance;

      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeTabIndex = Math.round(scrollProgress * (TABS.length - 1));
  const activeTabId = TABS[activeTabIndex].id;

  // Navegação ao clicar no menu pílula
  const scrollToTab = (index: number) => {
    if (!trackRef.current) return;
    const { top } = trackRef.current.getBoundingClientRect();
    const scrollableDistance = trackRef.current.scrollHeight - window.innerHeight;
    const targetProgress = index / (TABS.length - 1);
    const targetY = window.scrollY + top + (targetProgress * scrollableDistance);
    
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth; 
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const maxTranslate = 100 - (100 / TABS.length);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      
      {/* SEÇÃO 1: HERO SCROLL HORIZONTAL */}
      <section ref={trackRef} className="relative h-[400vh] bg-white">
        
        {/* Container fixo que desliza os conteúdos */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-gray-50/30">
          
          {/* 
            Menu Secundário (Pílula) 
            top-24 garante que não conflita com a Navbar Principal (que tem h-20) 
            z-40 para ficar logo abaixo da Navbar Principal (z-50)
          */}
          <div className="absolute top-24 left-0 w-full z-40 flex justify-center px-4">
            <div className="inline-flex items-center p-1.5 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full shadow-sm overflow-x-auto max-w-full">
              {TABS.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToTab(index)}
                  className={`px-5 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-sm transition-all duration-300 whitespace-nowrap ${
                    activeTabId === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Trilho de conteúdos das abas */}
          <div
            className="flex h-full will-change-transform"
            style={{
              width: `${TABS.length * 100}vw`,
              transform: `translateX(-${scrollProgress * maxTranslate}%)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {TABS.map((tab) => (
              <div key={tab.id} className="w-screen h-full flex items-center justify-center px-6 md:px-16 pt-16">
                <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                  
                  <div className="flex-1 space-y-6 text-center md:text-left">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-blue-600 tracking-tight">
                      {tab.title}
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                      {tab.subtitle}
                    </h2>
                    <div className="pt-4">
                      <a 
                        href={tab.ctaLink}
                        className="inline-flex items-center text-blue-600 font-bold text-lg hover:text-blue-800 transition-colors group"
                      >
                        {tab.ctaText}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="flex-1 w-full flex justify-center">
                    <div className={`w-full max-w-lg aspect-[4/3] rounded-3xl bg-gradient-to-br ${tab.imageGradient} shadow-inner border border-gray-100 flex items-center justify-center p-8`}>
                        <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-500">
                          {getTabIcon(tab.id)}
                        </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: CARROSSEL DE FUNCIONALIDADES */}
      <section className="py-24 px-6 md:px-16 bg-white border-t border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Tudo o que seu time precisa</h2>
              <p className="text-gray-600 text-lg">Deslize para ver as funcionalidades desenvolvidas para o seu comercial.</p>
            </div>
            
            <div className="flex gap-3">
              <button onClick={() => scroll(featureCarouselRef, 'left')} className="p-3 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50 transition-all shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button onClick={() => scroll(featureCarouselRef, 'right')} className="p-3 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50 transition-all shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>

          <div ref={featureCarouselRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[
              {
                title: "Gestão de Clientes",
                description: "Centralize todas as informações de contato, histórico e dados relevantes dos seus clientes em um único lugar.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              },
              {
                title: "Oportunidades",
                description: "Acompanhe o funil de vendas e gerencie cada etapa das suas oportunidades de negócio com facilidade e precisão.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
              },
              {
                title: "Controle de Usuários",
                description: "Organize os dados e as permissões de acesso da sua equipe para um trabalho muito mais seguro e colaborativo.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              },
              {
                title: "Integração via API",
                description: "API REST robusta construída em Java + Spring Boot, pronta para conectar o CRM a outras ferramentas da sua empresa.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              },
              {
                title: "Relatórios Ágeis",
                description: "Gere métricas em tempo real sobre o desempenho da sua equipe e as conversões das suas campanhas.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              }
            ].map((feat, index) => (
              <div key={index} className="snap-start shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <FeatureCard title={feat.title} description={feat.description} icon={feat.icon} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: DEPOIMENTOS E CTA */}
      <section className="py-24 px-6 md:px-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-3">Quem usa, recomenda</h2>
              <p className="text-slate-400 text-lg">Veja como o Relaciona tem transformado o processo comercial de outras empresas.</p>
            </div>
            
            <div className="flex gap-3">
              <button onClick={() => scroll(testimonialCarouselRef, 'left')} className="p-3 bg-slate-800 border border-slate-700 rounded-full text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-600 transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button onClick={() => scroll(testimonialCarouselRef, 'right')} className="p-3 bg-slate-800 border border-slate-700 rounded-full text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-600 transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>

          <div ref={testimonialCarouselRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[
              {
                company: "TechSolutions",
                quote: "Desde que implementamos o Relaciona, abandonamos nossas planilhas confusas. A visualização das oportunidades nos ajudou a dobrar nossos fechamentos mensais.",
                author: "Carlos Mendes",
                role: "Diretor Comercial"
              },
              {
                company: "Inova Varejo",
                quote: "A facilidade de uso do sistema impressiona. Nossa equipe aprendeu a usar no primeiro dia, e a integração via API com nosso ERP foi perfeita graças ao backend robusto.",
                author: "Ana Beatriz",
                role: "Gerente de Operações"
              },
              {
                company: "Global Logistics",
                quote: "O controle de usuários é exatamente o que precisávamos. Cada representante só acessa seus próprios clientes, garantindo a segurança dos dados da nossa matriz.",
                author: "Fernando Costa",
                role: "CEO"
              }
            ].map((test, index) => (
              <div key={index} className="snap-start shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <TestimonialCard {...test} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}