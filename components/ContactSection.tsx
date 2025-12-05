import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import ContactForm from './ContactForm';

const ContactSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-cream dark:bg-navy-950">
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-navy-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-navy-800 flex flex-col md:flex-row min-h-[600px]">
          
          {/* Info Side - Schola Navy Background */}
          <div className="md:w-5/12 bg-navy-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
             {/* Decor */}
             <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-600 opacity-20 rounded-full blur-[80px]"></div>
             <div className="absolute bottom-0 -left-10 w-64 h-64 bg-gold-500 opacity-10 rounded-full blur-[80px]"></div>

             <div className="relative z-10">
               <h3 className="text-4xl font-serif font-bold mb-8 text-white">Contactez l'agence</h3>
               <p className="text-navy-200 mb-10 text-lg leading-relaxed">
                 Une question sur un cours ? Besoin d'un devis personnalisé ? 
                 Notre équipe à Narbonne vous répond avec plaisir.
               </p>
               
               <div className="space-y-8">
                 <div className="flex items-start gap-5 group">
                   <div className="bg-navy-800 p-3 rounded-xl border border-navy-700 group-hover:border-gold-500/50 transition-colors"><Phone size={24} className="text-gold-500" /></div>
                   <div>
                      <p className="text-xs text-navy-400 uppercase tracking-wider font-bold mb-1">Téléphone</p>
                      <p className="text-lg font-semibold">{COMPANY_INFO.phone}</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-5 group">
                   <div className="bg-navy-800 p-3 rounded-xl border border-navy-700 group-hover:border-gold-500/50 transition-colors"><Mail size={24} className="text-gold-500" /></div>
                   <div>
                      <p className="text-xs text-navy-400 uppercase tracking-wider font-bold mb-1">Email</p>
                      <p className="text-lg font-semibold">contact@via-schola.fr</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-5 group">
                   <div className="bg-navy-800 p-3 rounded-xl border border-navy-700 group-hover:border-gold-500/50 transition-colors"><MapPin size={24} className="text-gold-500" /></div>
                    <div>
                      <p className="text-xs text-navy-400 uppercase tracking-wider font-bold mb-1">Agence</p>
                      <p className="text-lg font-semibold">{COMPANY_INFO.address}</p>
                   </div>
                 </div>
               </div>
             </div>

             <div className="mt-12 relative z-10">
               <a 
                 href="https://wa.me/33667592555" 
                 target="_blank" 
                 rel="noreferrer"
                 className="bg-[#25D366] hover:bg-[#20bd5a] text-white w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-900/20 hover:shadow-green-900/30 text-lg"
               >
                 <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                 Réponse immédiate sur WhatsApp
               </a>
             </div>
          </div>

          {/* Form Side */}
          <div className="md:w-7/12 p-10 md:p-14 relative bg-white dark:bg-navy-900">
             <h3 className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-8">Demande de Bilan offert</h3>
             <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;