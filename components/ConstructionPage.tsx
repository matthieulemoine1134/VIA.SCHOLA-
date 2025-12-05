import React from 'react';
import { Construction, ArrowLeft } from 'lucide-react';

interface ConstructionPageProps {
  title: string;
  onBack: () => void;
}

const ConstructionPage: React.FC<ConstructionPageProps> = ({ title, onBack }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
      <div className="w-24 h-24 bg-navy-50 text-navy-900 rounded-full flex items-center justify-center mb-8 shadow-inner">
        <Construction size={48} />
      </div>
      <h1 className="text-3xl md:text-5xl font-serif font-bold text-navy-900 mb-6">{title}</h1>
      <div className="bg-gold-500/10 text-gold-600 px-6 py-2 rounded-full font-bold mb-8 border border-gold-500/20">
        Site en construction
      </div>
      <p className="text-navy-600 max-w-lg mx-auto text-lg mb-12">
        Nous travaillons activement pour vous offrir un espace dédié performant et sécurisé.
        Cette fonctionnalité sera bientôt disponible.
      </p>
      
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-navy-900 hover:text-violet-600 font-bold transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Retour à l'accueil
      </button>
    </div>
  );
};

export default ConstructionPage;