import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const CITIES = [
  "Narbonne",
  "Lézignan-Corbières",
  "Sigean",
  "Gruissan",
  "Coursan",
  "Vinassan",
  "Cuxac-d'Aude",
  "Fleury",
  "Sallèles-d'Aude",
  "Port-la-Nouvelle",
  "Armissan",
  "Moussan",
  "Ouveillan",
  "Saint-Marcel-sur-Aude"
];

interface HeroProps {
    onOpenModal: (mode: 'bilan' | 'tarifs') => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const [cityIndex, setCityIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      // Wait for fade out animation to finish before changing text and fading back in
      setTimeout(() => {
        setCityIndex((prevIndex) => (prevIndex + 1) % CITIES.length);
        setIsVisible(true);
      }, 500); // Matches the duration-500 class

    }, 3000); // Change city every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="home" className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
      {/* Background decoration - Clean "Paper" feel */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-cream to-white dark:from-navy-950 dark:to-navy-900" />
      
      {/* Narbonne Photo Background with Fade */}
      <div className="absolute top-0 left-0 w-full h-[600px] z-0 pointer-events-none">
         <img 
            src="https://images.unsplash.com/photo-1596395819057-d37e25280525?q=80&w=2070&auto=format&fit=crop"
            alt="Narbonne et le Canal"
            className="w-full h-full object-cover opacity-25 dark:opacity-10"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/60 to-cream dark:via-navy-950/60 dark:to-navy-950"></div>
      </div>

      {/* The Guiding Line (Fil Conducteur) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[60%] bg-gradient-to-b from-violet-200 to-transparent dark:from-navy-700 dark:to-transparent -z-10 hidden md:block"></div>

      <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
        <div className="space-y-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm border border-violet-100 dark:border-navy-700 rounded-full px-4 py-1.5 text-xs font-semibold text-navy-600 dark:text-violet-200 shadow-sm mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            Inscriptions ouvertes 2025
          </div>
          
          {/* Main Title - Serif Font */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-navy-900 dark:text-white leading-[1.1] min-h-[3.5em] flex flex-col justify-center items-center font-serif drop-shadow-sm">
            <span>La Réussite Scolaire à</span>
            <span 
              className={`
                text-navy-900 dark:text-white underline decoration-gold-400 decoration-4 underline-offset-8 
                transition-all duration-500 block mt-2 px-2 italic
                ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}
              `}
            >
              {CITIES[cityIndex]}.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-navy-600 dark:text-navy-200 max-w-2xl mx-auto leading-relaxed">
            Soutien scolaire d'excellence du CP à la Terminale. <br className="hidden md:block"/>
            Bénéficiez de <b className="text-violet-600 dark:text-violet-400">50% de crédit d'impôt immédiat</b> et d'un accompagnement sur-mesure.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
            <button 
                onClick={() => onOpenModal('bilan')}
                className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-violet-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Réserver mon Bilan offert
              <ArrowRight size={20} />
            </button>
            <button 
                onClick={() => onOpenModal('tarifs')}
                className="bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-navy-700 text-navy-900 dark:text-white border border-navy-200 dark:border-navy-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center hover:border-violet-300"
            >
              Voir les tarifs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;