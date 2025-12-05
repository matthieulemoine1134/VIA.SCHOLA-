import React from 'react';
import { ArrowRight, Wallet, Clock, Info } from 'lucide-react';

interface TaxCreditSectionProps {
    onOpenModal: () => void;
}

const TaxCreditSection: React.FC<TaxCreditSectionProps> = ({ onOpenModal }) => {
  return (
    <section id="tax-credit" className="py-24 bg-navy-900 text-white overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-900 opacity-20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <div className="inline-block bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-sm mb-6 uppercase tracking-wider">
            Dispositif 2025
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-serif mb-8">Ne payez que 50% <br/><span className="text-violet-400 italic">en temps réel.</span></h2>
          <p className="text-navy-100 text-lg mb-8 leading-relaxed font-light">
            Fini le décalage d'un an pour le remboursement ! Avec l'<b>Avance Immédiate de l'URSSAF</b>, le crédit d'impôt est déduit instantanément de votre facture.
          </p>
          
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 border border-green-500/50 flex items-center justify-center text-sm">✓</div>
              <span className="text-lg">Aucune avance de frais.</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 border border-green-500/50 flex items-center justify-center text-sm">✓</div>
              <span className="text-lg">Inscription gratuite au service.</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 border border-green-500/50 flex items-center justify-center text-sm">✓</div>
              <span className="text-lg">Visible en temps réel sur l'URSSAF.</span>
            </li>
          </ul>
        </div>

        {/* Smart Choice Visual */}
        <div className="relative">
          <div className="absolute -top-6 -left-6 bg-violet-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg transform -rotate-3 z-20">
             Le Choix Malin
          </div>
          
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
             
             {/* Comparison Container */}
             <div className="space-y-6">
                
                {/* Before */}
                <div className="bg-navy-800/50 p-6 rounded-2xl border border-white/5 flex items-center justify-between opacity-60 grayscale hover:grayscale-0 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center shrink-0">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wide font-bold text-gray-400">Classique</p>
                            <p className="text-xl md:text-2xl font-serif font-bold">1 séance d'1h30</p>
                        </div>
                    </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-3 relative z-10">
                    <div className="bg-navy-900 border border-white/10 p-2 rounded-full text-gold-500">
                        <ArrowRight size={20} className="transform rotate-90" />
                    </div>
                </div>

                {/* After - Via Schola */}
                <div className="bg-gradient-to-r from-violet-900/50 to-navy-800 p-6 rounded-2xl border border-gold-500/30 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-gold-400/5 animate-pulse"></div>
                    
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 bg-gold-500 text-navy-900 rounded-full flex items-center justify-center shadow-lg shadow-gold-500/20 shrink-0">
                            <Clock size={24} strokeWidth={3} />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wide font-bold text-gold-400">Avec Via Schola</p>
                            <p className="text-xl md:text-2xl font-serif font-bold text-white">2 séances d'1h30</p>
                        </div>
                    </div>
                    <div className="text-right relative z-10">
                        <div className="flex items-center gap-2 justify-end mb-1">
                             <Wallet size={16} className="text-green-400" />
                             <span className="text-xs font-bold text-green-400 uppercase">Même Budget</span>
                        </div>
                    </div>
                </div>

             </div>

             <div className="mt-8 text-center space-y-4">
                 <p className="text-lg font-serif italic text-navy-100">
                     "Pour le même prix, doublez le temps de réussite de votre enfant."
                 </p>
                 <button 
                    onClick={onOpenModal}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-bold transition-all text-sm uppercase tracking-wide"
                 >
                    <Info size={18} />
                    Demande d'information
                 </button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxCreditSection;