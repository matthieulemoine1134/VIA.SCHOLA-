import React from 'react';
import { X, Info, Briefcase } from 'lucide-react';
import ContactForm from './ContactForm';
import CandidatureForm from './CandidatureForm';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'bilan' | 'tarifs' | 'candidature';
  customContent?: { title: string, text: string } | null;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, mode, customContent }) => {
  if (!isOpen) return null;

  const getTitle = () => {
    if (customContent) return customContent.title;
    switch(mode) {
      case 'tarifs': return 'Tarifs & Devis';
      case 'candidature': return 'Rejoindre l\'équipe';
      default: return 'Demande de Bilan offert';
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-navy-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200 border border-navy-100 dark:border-navy-800">
        
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-navy-900 z-10 px-6 py-5 border-b border-gray-100 dark:border-navy-800 flex justify-between items-center">
          <h3 className="text-2xl font-serif font-bold text-navy-900 dark:text-white flex items-center gap-2">
            {mode === 'candidature' && <Briefcase size={24} className="text-violet-600" />}
            {getTitle()}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-cream dark:hover:bg-navy-800 rounded-full transition-colors"
          >
            <X size={20} className="text-navy-500 dark:text-navy-400" />
          </button>
        </div>

        <div className="p-6 md:p-10">
            {/* Custom Content for Services */}
            {customContent && (
               <div className="mb-8">
                 <p className="text-navy-700 dark:text-navy-200 text-lg leading-relaxed">
                   {customContent.text}
                 </p>
                 <div className="h-px bg-gray-100 dark:bg-navy-800 mt-8"></div>
               </div>
            )}

            {/* Conditional Messages */}
            {mode === 'tarifs' && !customContent && (
                <div className="bg-navy-50 dark:bg-navy-800/50 border border-navy-100 dark:border-navy-700 rounded-xl p-5 mb-8 flex gap-4 items-start">
                    <Info className="text-violet-600 dark:text-violet-400 shrink-0 mt-1" size={24} />
                    <div>
                        <p className="font-bold text-navy-900 dark:text-navy-100 text-sm mb-1 font-serif">
                            Offre 100% Personnalisée
                        </p>
                        <p className="text-sm text-navy-700 dark:text-navy-300 leading-relaxed">
                            Nos tarifs débutent à <span className="font-bold text-violet-600 dark:text-violet-400">20€/h</span> (après crédit d'impôt). 
                            Chaque élève est unique : pour obtenir votre tarif exact, nous réalisons un premier bilan pédagogique gratuit.
                        </p>
                    </div>
                </div>
            )}

             {mode === 'bilan' && !customContent && (
                 <p className="text-navy-600 dark:text-navy-300 mb-8 text-sm">
                     Remplissez ce formulaire pour réserver votre créneau de bilan pédagogique avec un conseiller à Narbonne. C'est gratuit et sans engagement.
                 </p>
             )}

            {mode === 'candidature' && (
                 <p className="text-navy-600 dark:text-navy-300 mb-8 text-sm">
                     Vous êtes professeur certifié ou expert dans votre domaine ? Rejoignez Via Schola à Narbonne.
                 </p>
            )}

            {mode === 'candidature' ? (
              <CandidatureForm onSuccess={onClose} />
            ) : (
              <ContactForm onSuccess={onClose} />
            )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;