import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, User, Briefcase, GraduationCap } from 'lucide-react';
import { NAV_ITEMS, COMPANY_INFO } from '../constants';
import { PageView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  onOpenModal: (mode: 'bilan' | 'tarifs' | 'candidature') => void;
  onNavigate: (view: PageView) => void;
  currentView: PageView;
}

const Layout: React.FC<LayoutProps> = ({ children, onOpenModal, onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, item: typeof NAV_ITEMS[0]) => {
    if (item.label === 'Devenir Prof') {
      e.preventDefault();
      onOpenModal('candidature');
      setIsMenuOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    setIsMenuOpen(false);
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-cream dark:bg-navy-950">
      {/* Top Bar - Trust & Contact - Navy Background */}
      <div className="bg-navy-900 text-white text-xs py-2 px-4 flex justify-between items-center z-50 relative border-b border-navy-800">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline opacity-80">📍 Agence Narbonne</span>
          <a href={`tel:${COMPANY_INFO.phone.replace(/ /g, '')}`} className="flex items-center gap-1 hover:text-gold-400 transition-colors font-semibold tracking-wide">
            <Phone size={12} className="text-gold-500" /> {COMPANY_INFO.phone}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('construction-enseignant')} 
            className="flex items-center gap-1 hover:text-gold-400 transition-colors"
          >
            <GraduationCap size={12} /> Espace Enseignant
          </button>
          <button 
            onClick={() => onNavigate('construction-famille')} 
            className="flex items-center gap-1 hover:text-gold-400 transition-colors"
          >
            <User size={12} /> Espace Famille
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'glass-panel shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo - Serif Font */}
          <a href="/" onClick={handleLogoClick} className="text-2xl font-bold tracking-tight text-navy-900 dark:text-white flex items-center gap-2 hover:opacity-90 transition-opacity font-serif group">
            <span className="bg-navy-900 text-gold-500 p-1.5 rounded-lg border border-gold-500/30 shadow-lg group-hover:scale-105 transition-transform duration-300">
              VS
            </span>
            Via Schola
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4">
            {NAV_ITEMS.map((item) => (
              <button 
                key={item.label} 
                onClick={(e) => handleNavClick(e, item)}
                className="bg-navy-900 hover:bg-navy-800 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 border border-navy-800"
              >
                <Briefcase size={16} />
                {item.label}
              </button>
            ))}
            <button 
                onClick={() => onOpenModal('bilan')}
                className="bg-gold-500 hover:bg-gold-600 text-navy-900 px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-gold-500/20"
            >
              Bilan offert
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-navy-900 dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-cream dark:bg-navy-900 border-b border-gray-200 dark:border-navy-800 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-5 z-40">
            {NAV_ITEMS.map((item) => (
              <button 
                key={item.label} 
                onClick={(e) => handleNavClick(e, item)}
                className="bg-navy-900 text-white px-5 py-3 rounded-xl w-full font-bold shadow-sm flex items-center justify-center gap-2"
              >
                <Briefcase size={18} />
                {item.label}
              </button>
            ))}
            <button 
                onClick={() => {
                    setIsMenuOpen(false);
                    onOpenModal('bilan');
                }}
                className="bg-gold-500 text-navy-900 px-5 py-3 rounded-xl w-full font-bold shadow-lg shadow-gold-500/30"
            >
              Bilan offert
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer - Navy Background */}
      <footer className="bg-navy-950 text-navy-300 py-16 text-sm border-t border-navy-900 relative overflow-hidden">
        {/* Decorative Guiding Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-navy-800 to-transparent opacity-20"></div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div>
            <h3 className="text-white font-serif font-bold text-xl mb-6">Via Schola</h3>
            <p className="mb-6 leading-relaxed">L'excellence scolaire à portée de main à Narbonne. Une approche humaine et innovante pour la réussite de votre enfant.</p>
            <div className="flex items-center gap-2 text-white">
              <span className="bg-green-600/20 text-green-400 border border-green-600/30 px-3 py-1 rounded-full text-xs font-bold">Agrément SAP</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-serif font-semibold mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-gold-400 transition-colors">Notre Pédagogie</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Nos Tarifs</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Mentions Légales</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Politique de Confidentialité</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-semibold mb-6">Nous Contacter</h4>
            <p className="text-white">{COMPANY_INFO.address}</p>
            <p className="mt-3 font-medium text-gold-400">{COMPANY_INFO.phone}</p>
            <p className="mt-1">{COMPANY_INFO.email}</p>
          </div>

          <div>
            <h4 className="text-white font-serif font-semibold mb-6">Conformité</h4>
            <p className="text-xs text-navy-400 mb-4 leading-relaxed">
              Organisme déclaré sous le numéro {COMPANY_INFO.sapNumber}. 
              Mode prestataire. L'avantage fiscal prend la forme d'un crédit d'impôt de 50% selon l'article 199 sexdecies du CGI.
            </p>
            <div className="flex gap-3 mt-4">
              <div className="w-10 h-10 bg-violet-900/50 border border-violet-500/30 rounded-lg flex items-center justify-center text-[10px] text-violet-200 font-bold" title="Logo SAP">SAP</div>
              <div className="w-10 h-10 bg-navy-800 border border-navy-600 rounded-lg flex items-center justify-center text-[10px] text-white font-bold" title="Avance Immédiate">URSSAF</div>
            </div>
          </div>
        </div>
        <div className="text-center mt-16 pt-8 border-t border-navy-900 text-xs text-navy-500">
          &copy; 2025 Via Schola. Tous droits réservés. Hébergé en France (o2switch).
        </div>
      </footer>
    </div>
  );
};

export default Layout;