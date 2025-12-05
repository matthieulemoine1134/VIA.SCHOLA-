import React from 'react';
import { SERVICES } from '../constants';
import { CalendarClock, Zap, GraduationCap, Briefcase, ArrowUpRight, BrainCircuit } from 'lucide-react';
import { ServiceItem } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  CalendarClock: <CalendarClock size={32} />,
  Zap: <Zap size={32} />,
  GraduationCap: <GraduationCap size={32} />,
  Briefcase: <Briefcase size={32} />,
  BrainCircuit: <BrainCircuit size={32} />,
};

interface BentoGridProps {
    onOpenModal: (content: { title: string, text: string }) => void;
}

const BentoGrid: React.FC<BentoGridProps> = ({ onOpenModal }) => {
  return (
    <section id="services" className="py-24 bg-white dark:bg-navy-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-navy-900 dark:text-white mb-6">Nos Formules d'Excellence</h2>
          <p className="text-navy-600 dark:text-navy-300 max-w-2xl mx-auto text-lg">
            Que ce soit pour un suivi régulier ou un stage intensif, nous avons la solution adaptée à chaque élève audois.
          </p>
        </div>

        {/* 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <BentoCard 
                key={service.id} 
                service={service} 
                onClick={() => {
                    if (service.modalTitle && service.modalContent) {
                        onOpenModal({ title: service.modalTitle, text: service.modalContent });
                    }
                }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface BentoCardProps {
    service: ServiceItem;
    onClick: () => void;
}

const BentoCard: React.FC<BentoCardProps> = ({ service, onClick }) => {
  return (
    <div className={`
      relative group overflow-hidden rounded-3xl p-8 flex flex-col justify-between
      ${service.highlight 
        ? 'bg-cream dark:bg-navy-800 border-2 border-violet-100 dark:border-navy-600 min-h-[350px]' 
        : 'bg-cream dark:bg-navy-900/50 border border-gray-100 dark:border-navy-800 min-h-[300px]'} 
      ${service.colSpan}
      hover:shadow-2xl hover:shadow-navy-900/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer
    `}
    onClick={onClick}
    >
      {service.badge && (
        <div className="absolute top-0 right-0 bg-gold-500 text-navy-900 text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm z-10">
          {service.badge}
        </div>
      )}

      <div>
        <div className={`mb-6 ${service.highlight ? 'text-violet-600 dark:text-violet-400' : 'text-navy-700 dark:text-navy-300'} group-hover:scale-110 transition-transform duration-300 origin-left`}>
          {iconMap[service.iconName]}
        </div>
        
        <h3 className="text-2xl font-bold font-serif text-navy-900 dark:text-white mb-4">{service.title}</h3>
        <p className="text-navy-600 dark:text-navy-400 text-lg leading-relaxed">{service.description}</p>
      </div>
      
      <div className="mt-8">
        <span className={`inline-flex items-center gap-1 text-sm font-bold transition-colors group-hover:gap-2 ${service.badge ? 'text-gray-400' : 'text-navy-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400'}`}>
          {service.linkText}
          {!service.badge && <ArrowUpRight size={16} />}
        </span>
      </div>
      
      {/* Background decoration */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-violet-500 opacity-5 rounded-full blur-3xl pointer-events-none group-hover:opacity-10 transition-opacity"></div>
    </div>
  );
};

export default BentoGrid;