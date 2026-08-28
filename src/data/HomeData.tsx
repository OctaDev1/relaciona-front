import type { TabData, TeamMember, TabId } from "../types/HomeTypes";


export const TABS: TabData[] = [
  { id: 'relaciona', label: 'Relaciona CRM', title: 'Relaciona', subtitle: 'Controle total da sua operação comercial.', ctaText: 'Conheça o sistema', ctaLink: '#', imageGradient: 'from-blue-100 to-blue-50' },
  { id: 'oportunidades', label: 'Oportunidades', title: 'Gestão de Vendas', subtitle: 'Acompanhe cada etapa do seu funil e feche mais negócios.', ctaText: 'Explorar oportunidades', ctaLink: '#', imageGradient: 'from-cyan-100 to-blue-50' },
  { id: 'metricas', label: 'Métricas e BI', title: 'Dados Precisos', subtitle: 'Tome decisões baseadas em relatórios gerados em tempo real.', ctaText: 'Ver relatórios', ctaLink: '#', imageGradient: 'from-indigo-100 to-blue-50' },
  { id: 'equipe', label: 'Gestão de Equipe', title: 'Trabalho Colaborativo', subtitle: 'Organize permissões, delegue tarefas e unifique seu time.', ctaText: 'Gerenciar time', ctaLink: '#', imageGradient: 'from-sky-100 to-white' }
];

export const MENU_ITEMS = [
  { label: 'Relaciona CRM', index: 0 },
  { label: 'Oportunidades', index: 1 },
  { label: 'Métricas e BI', index: 2 },
  { label: 'Gestão de Equipe', index: 3 },
  { label: 'Funcionalidades', index: 4 },
  { label: 'Nossa Equipe', index: 5 },
  { label: 'Depoimentos', index: 6 },
  { label: 'Contato', index: 7 },
];

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Felipe Oliveira Lopes", role: "Desenvolvedor Full Stack Júnior", description: "Especialista em construir interfaces fluidas com React e TypeScript, aliado a um backend robusto.", imageUrl: "https://ik.imagekit.io/JohnnieDiniz/integrantes/foto_felipe.jpeg?updatedAt=1787845475178" },
  { name: "Gabriel José Alegre", role: "Product Designer", description: "Focado em criar experiências de usuário intuitivas e acessíveis, garantindo que o design atenda as necessidades do cliente.", imageUrl: "https://ik.imagekit.io/JohnnieDiniz/integrantes/gabriel.png?updatedAt=1787845475225" },
  { name: "Giovanna Karolline", role: "Desenvolvedor Full Stack Júnior", description: "Especialista em arquitetura de dados e construção de APIs RESTful integradas de alta performance.", imageUrl: "https://ik.imagekit.io/JohnnieDiniz/integrantes/giovanna.jpg?updatedAt=1787845475179" },
  { name: "Guilherme Oliveira", role: "Desenvolvedor Full Stack Júnior", description: "Dedicado ao desenvolvimento ágil, versionamento de código e automação de rotinas no ecossistema Spring.", imageUrl: "https://ik.imagekit.io/JohnnieDiniz/integrantes/guilherme.jpeg?updatedAt=1787845475160" },
  { name: "João Vitor Diniz Alves", role: "Desenvolvedor Full Stack Júnior", description: "Especialista em backend com Java e Spring Boot, unindo forças com frontend moderno em React e Tailwind.", imageUrl: "https://ik.imagekit.io/JohnnieDiniz/Joao%20Vitor.jpg?updatedAt=1787581763893" },
  { name: "Juliana Macedo", role: "Desenvolvedor Full Stack Júnior", description: "Apaixonada por resolução de problemas, lógica de programação e integração contínua de sistemas web.", imageUrl: "https://ik.imagekit.io/JohnnieDiniz/integrantes/Juliana.jpg?updatedAt=1787845475220" },
  { name: "Maryane Praxedes", role: "Desenvolvedor Full Stack Júnior", description: "Focada em entregar soluções limpas, testes unitários rigorosos e experiências visuais responsivas.", imageUrl: "https://ik.imagekit.io/JohnnieDiniz/integrantes/Maryane.webp?updatedAt=1787848292301" },
  { name: "Thiago José Versiani", role: "Desenvolvedor Full Stack Júnior", description: "Construindo aplicações seguras, escaláveis e focadas em otimização de performance corporativa.", imageUrl: "https://ik.imagekit.io/JohnnieDiniz/integrantes/thiago.jpg?updatedAt=1787845475180" }
];

export const getTabIcon = (tabId: TabId) => {
  switch(tabId) {
    case 'relaciona': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
    case 'oportunidades': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>;
    case 'metricas': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
    case 'equipe': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
  }
};