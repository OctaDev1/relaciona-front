import React, { useRef, useState, useEffect } from 'react';
import { FeatureCard } from '../../components/featurecards/Featurecards';
import { TeamCard } from '../../components/teamcard/TeamCard';
import { TestimonialCard } from '../../components/testimonialcard/TestimonialCard';
import { AboutModal } from '../../components/modal/AboutModal';
import { MENU_ITEMS, getTabIcon, TEAM_MEMBERS } from '../../data/HomeData';
import { RelatoriosModal } from '../../components/modal/RelatoriosModal';
import { OportunidadesModal } from '../../components/modal/OportunidadesModal';
import { MetricasSection } from '../../components/modal/MetricasSection';


export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOportunidadesOpen, setIsOportunidadesOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const featureCarouselRef = useRef<HTMLDivElement>(null);
  const testimonialCarouselRef = useRef<HTMLDivElement>(null);
  const teamCarouselRef = useRef<HTMLDivElement>(null);

  const TOTAL_SLIDES = 8;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      let progress = scrollY / maxScroll;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (teamCarouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = teamCarouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          teamCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          teamCarouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const currentSlideIndex = Math.round(scrollProgress * (TOTAL_SLIDES - 1));

  const scrollToSlide = (index: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetProgress = index / (TOTAL_SLIDES - 1);
    const targetY = targetProgress * maxScroll;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth;
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const maxTranslate = 100 - (100 / TOTAL_SLIDES);

  return (
    <div className="bg-slate-950 font-sans">

      <div className="h-[800vh] w-full relative z-0"></div>

      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden z-10 bg-gray-50/30">

        <div className="absolute top-4 sm:top-8 left-0 w-full z-40 flex justify-center px-4">
          
          {/* Mobile Menu (Dropdown Card) */}
          <div className="relative md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 px-5 py-3 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg font-bold text-sm text-blue-600 transition-all duration-300"
            >
              <span>{MENU_ITEMS.find(item => item.index === currentSlideIndex)?.label || 'Menu'}</span>
              <svg className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            
            {isMenuOpen && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl w-64 p-2 flex flex-col gap-1 max-h-[60vh] overflow-y-auto">
                {MENU_ITEMS.map((item) => (
                  <button
                    key={item.index}
                    onClick={() => {
                      scrollToSlide(item.index);
                      setIsMenuOpen(false);
                    }}
                    className={`px-4 py-2.5 text-left rounded-xl text-sm font-bold transition-all ${
                      currentSlideIndex === item.index
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Menu (Inline List) */}
          <div className="hidden md:inline-flex items-center p-1.5 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full shadow-sm overflow-x-auto max-w-full scroll-smooth [&::-webkit-scrollbar]:hidden">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.index}
                onClick={() => scrollToSlide(item.index)}
                className={`px-4 lg:px-5 py-2 lg:py-2.5 rounded-full font-bold text-xs lg:text-sm transition-all duration-300 whitespace-nowrap ${currentSlideIndex === item.index ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

        </div>

        {/* Trilho Horizontal */}
        <div
          className="flex h-full transition-transform duration-100 ease-out will-change-transform"
          style={{
            width: `${TOTAL_SLIDES * 100}vw`,
            transform: `translateX(-${scrollProgress * maxTranslate}%)`
          }}
        >

          {/* ==================== SLIDE 1: RELACIONA ==================== */}
          <div className="w-screen h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none px-4 sm:px-6 md:px-10 lg:px-16 bg-blue-50 shrink-0">
            <div className="w-full min-h-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-24 py-24">
              <div className="flex-1 space-y-4 sm:space-y-6 text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-blue-600 tracking-tight">Relaciona</h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">Controle total da sua operação comercial.</h2>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAboutModalOpen(true)}
                    className="inline-flex items-center text-blue-600 font-bold text-base sm:text-lg hover:text-blue-800 transition-colors group"
                  >
                    Conheça o sistema
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full flex justify-center">
                <div className="w-full max-w-lg aspect-video rounded-3xl bg-linear-to-br from-blue-100 to-blue-50 shadow-2xl border border-gray-100 flex items-center justify-center p-8">
                  <img
                    src="https://ik.imagekit.io/JohnnieDiniz/logo-relaciona.png?updatedAt=1787844593939"
                    alt="Logo Relaciona CRM"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ==================== SLIDE 2: OPORTUNIDADES ==================== */}
          <div className="w-screen h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none px-4 sm:px-6 md:px-10 lg:px-16 bg-blue-50 shrink-0">
            <div className="w-full min-h-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-24 py-24">
              <div className="flex-1 space-y-4 sm:space-y-6 text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-blue-600 tracking-tight">Gestão de Vendas</h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">Acompanhe cada etapa do seu funil e feche mais negócios.</h2>
                <div className="pt-4">
                  <button 
                    onClick={() => setIsOportunidadesOpen(true)}
                    className="inline-flex items-center text-blue-600 font-bold text-lg hover:text-blue-800 transition-colors group cursor-pointer"
                  >
                    Explorar oportunidades
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full flex justify-center">
                <div className="w-full max-w-lg aspect-video rounded-3xl bg-linear-to-br from-cyan-100 to-blue-50 shadow-2xl border border-gray-100 flex items-center justify-center p-8">
                  <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-500">
                    {getTabIcon('oportunidades')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== SLIDE 3: MÉTRICAS E BI ==================== */}
          <div className="w-screen h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none px-4 sm:px-6 md:px-10 lg:px-16 bg-blue-50 shrink-0">
            <div className="w-full min-h-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-24 py-24">
              <div className="flex-1 space-y-4 sm:space-y-6 text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-blue-600 tracking-tight">Dados Precisos</h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">Tome decisões baseadas em relatórios gerados em tempo real.</h2>
                <div className="pt-4">
                  <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="inline-flex items-center text-blue-600 font-bold text-lg hover:text-blue-800 transition-colors group cursor-pointer"
                  >
                    Ver relatórios
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full flex justify-center">
                <div className="w-full max-w-lg aspect-video rounded-3xl bg-linear-to-br from-indigo-100 to-blue-50 shadow-2xl border border-gray-100 flex items-center justify-center p-8">
                  <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-500">
                    {getTabIcon('metricas')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== SLIDE 4: GESTÃO DE EQUIPE ==================== */}
          <div className="w-screen h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none px-4 sm:px-6 md:px-10 lg:px-16 bg-blue-50 shrink-0">
            <div className="w-full min-h-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-24 py-24">
              <div className="flex-1 space-y-4 sm:space-y-6 text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-blue-600 tracking-tight">Trabalho Colaborativo</h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">Organize permissões, delegue tarefas e unifique seu time.</h2>
                <div className="pt-4">
                  <a href="#" className="inline-flex items-center text-blue-600 font-bold text-base sm:text-lg hover:text-blue-800 transition-colors group">
                    Gerenciar time
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </a>
                </div>
              </div>
              <div className="flex-1 w-full flex justify-center">
                <div className="w-full max-w-lg aspect-video rounded-3xl bg-linear-to-br from-sky-100 to-white shadow-2xl border border-gray-100 flex items-center justify-center p-8">
                  <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-500">
                    {getTabIcon('equipe')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== SLIDE 5: Funcionalidades ==================== */}
          <div className="w-screen h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none bg-blue-50 border-l border-gray-100 shrink-0">
            <div className="w-full min-h-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto py-24 flex flex-col justify-center">
              <div className="flex flex-col md:flex-row justify-between items-end mb-8 sm:mb-12 gap-4 sm:gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2 sm:mb-3">Tudo o que seu time precisa</h2>
                  <p className="text-gray-600 text-base sm:text-lg md:text-xl">Deslize para ver as funcionalidades desenvolvidas para o seu comercial.</p>
                </div>
              </div>
              <div ref={featureCarouselRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                {[
                  { title: "Gestão de Clientes", description: "Centralize todas as informações de contato, histórico e dados relevantes dos seus clientes.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
                  { title: "Oportunidades", description: "Acompanhe o funil de vendas e gerencie cada etapa das suas oportunidades de negócio.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg> },
                  { title: "Controle de Usuários", description: "Organize os dados e as permissões de acesso da sua equipe para um trabalho seguro.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> },
                  { title: "Integração via API", description: "API REST pronta para conectar o CRM a outras ferramentas da sua empresa.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> }
                ].map((feat, index) => (
                  <div key={index} className="snap-start shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                    <FeatureCard title={feat.title} description={feat.description} icon={feat.icon} />
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-3 mt-2">
                <button onClick={() => scroll(featureCarouselRef, 'left')} className="p-3 bg-blue-600 border border-blue-600 rounded-full text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-600 transition-all"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                <button onClick={() => scroll(featureCarouselRef, 'right')} className="p-3 bg-blue-600 border border-blue-600 rounded-full text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-600 transition-all"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
              </div>
            </div>
          </div>

          {/* ==================== SLIDE 6: Equipe ==================== */}
          <div className="w-screen h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none bg-blue-50 border-l border-gray-100 shrink-0">
            <div className="w-full min-h-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto py-24 flex flex-col justify-center">
              <div className="flex flex-col md:flex-row justify-between items-end mb-6 sm:mb-10 gap-4 sm:gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2">Quem constrói o Relaciona</h2>
                  <p className="text-gray-600 text-base sm:text-lg">Conheça as mentes por trás do desenvolvimento do nosso CRM.</p>
                </div>
              </div>
              <div ref={teamCarouselRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                {TEAM_MEMBERS.map((member, index) => (
                  <TeamCard key={index} {...member} />
                ))}
              </div>
              <div className="flex justify-center gap-3 mt-2">
                <button onClick={() => scroll(teamCarouselRef, 'left')} className="p-3 bg-blue-600 border border-blue-600 rounded-full text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-600 transition-all"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                <button onClick={() => scroll(teamCarouselRef, 'right')} className="p-3 bg-blue-600 border border-blue-600 rounded-full text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-600 transition-all"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
              </div>
            </div>
          </div>

          {/* ==================== SLIDE 7: Depoimentos ==================== */}
          <div className="w-screen h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none bg-blue-50 text-blue-600 relative shrink-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full blur-[120px] pointer-events-none"></div>
            <div className="w-full min-h-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto relative z-10 py-24 flex flex-col justify-center">
              <div className="flex flex-col md:flex-row justify-between items-end mb-8 sm:mb-12 gap-4 sm:gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">Quem usa, recomenda</h2>
                  <p className="text-slate-400 text-base sm:text-lg md:text-xl">Veja como o Relaciona tem transformado o processo comercial de outras empresas.</p>
                </div>
              </div>
              <div ref={testimonialCarouselRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none bg-blue-50">
                {[
                  { company: "TechSolutions", quote: "Desde que implementamos o Relaciona, abandonamos nossas planilhas confusas. A visualização das oportunidades nos ajudou a dobrar nossos fechamentos mensais.", author: "Carlos Mendes", role: "Diretor Comercial" },
                  { company: "Inova Varejo", quote: "A facilidade de uso do sistema impressiona. Nossa equipe aprendeu a usar no primeiro dia, e a integração via API com nosso ERP foi perfeita.", author: "Ana Beatriz", role: "Gerente de Operações" },
                  { company: "Global Logistics", quote: "O controle de usuários é exatamente o que precisávamos. Cada representante só acessa seus próprios clientes com total segurança.", author: "Fernando Costa", role: "CEO" }
                ].map((test, index) => (
                  <div key={index} className="snap-start shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                    <TestimonialCard {...test} />
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-3 mt-2">
                <button onClick={() => scroll(testimonialCarouselRef, 'left')} className="p-3 bg-blue-600 border border-blue-600 rounded-full text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-600 transition-all"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                <button onClick={() => scroll(testimonialCarouselRef, 'right')} className="p-3 bg-blue-600 border border-blue-600 rounded-full text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-600 transition-all"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
              </div>
            </div>
          </div>

          {/* ==================== SLIDE 8: Contato & Footer ==================== */}
          <div className="w-screen h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none bg-blue-50 text-white shrink-0 relative">
            <div className="w-full min-h-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-6xl mx-auto pt-20 pb-6 flex flex-col justify-between">

              <div className="flex flex-col md:flex-row gap-6 sm:gap-10 lg:gap-12 grow items-center justify-center">
                <div className="flex-1 space-y-4 sm:space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600 leading-tight">Pronto para transformar suas vendas?</h2>
                  <p className="text-slate-400 text-base sm:text-lg md:text-xl leading-relaxed">
                    Entre em contato com a nossa equipe hoje mesmo e descubra como o Relaciona pode automatizar o seu negócio.
                  </p>
                  <div className="pt-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Siga nossas redes</p>
                    <div className="flex gap-3">
                      <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-full max-w-md">
                  <form className="bg-white/50 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-white/20 shadow-xl flex flex-col gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-blue-950 mb-1">Nome completo</label>
                      <input type="text" placeholder="Ex: Maria Silva" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-black focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-blue-950 mb-1">E-mail corporativo</label>
                      <input type="email" placeholder="maria@empresa.com" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-black focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-blue-950 mb-1">Mensagem</label>
                      <textarea rows={3} placeholder="Como podemos ajudar?" className="w-full border border-gray-200 shadow-sm rounded-xl px-4 py-2.5 text-black focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none bg-white"></textarea>
                    </div>
                    <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all mt-1">
                      Enviar mensagem
                    </button>
                  </form>
                </div>
              </div>

              <div className="w-full pt-6 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-blue-600 mt-8">
                <div className="flex items-center gap-2 font-semibold">
                  <img
                    src="https://ik.imagekit.io/JohnnieDiniz/logo_sem_fundo.svg?updatedAt=1787844777961"
                    alt="Logo Relaciona CRM"
                    className="w-5 h-5 object-contain"
                  />
                  Relaciona CRM
                </div>
                <p className="font-medium">© 2026 Relaciona CRM. Todos os direitos reservados.</p>
                <div className="flex gap-4 font-medium">
                  <a href="#" className="hover:text-blue-800 transition-colors">Termos</a>
                  <a href="#" className="hover:text-blue-800 transition-colors">Privacidade</a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Modais renderizados dentro do container fixo principal */}
        <RelatoriosModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onOpenOportunidades={() => setIsOportunidadesOpen(true)}
        />
        <OportunidadesModal 
          isOpen={isOportunidadesOpen} 
          onClose={() => setIsOportunidadesOpen(false)} 
        />

      </div>
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
    </div>
  );
}