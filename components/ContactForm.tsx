import React, { useState } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';

interface ContactFormProps {
  onSuccess?: () => void;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, className = "" }) => {
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    studentClass: '',
    subject: '',
    details: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone || !formData.email) return;
    
    setStatus('loading');

    // On prépare les données pour Netlify (Encodage Formulaire)
    const encode = (data: any) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
    };
    
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact-narbonne", ...formData })
      });
      
      setStatus('success');
      setFormData({
          parentName: '',
          email: '',
          phone: '',
          studentClass: '',
          subject: '',
          details: ''
      });
  
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
          setStatus('idle');
        }, 2000);
      }
    } catch (error) {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className={`flex flex-col items-center justify-center p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 h-full ${className}`}>
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-serif font-bold text-navy-900 dark:text-white mb-3">Demande reçue !</h3>
        <p className="text-navy-600 dark:text-navy-300 mb-8 max-w-md">
            Parfait. Matthieu ou son équipe vous rappelleront très rapidement pour faire le point.
        </p>
        <button 
            onClick={() => setStatus('idle')}
            className="bg-navy-900 hover:bg-navy-800 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
        >
            Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    // On garde la structure visuelle, on change juste le onSubmit
    <form className={`space-y-5 ${className}`} onSubmit={handleSubmit}>
       {/* (Le reste de ton formulaire HTML reste identique, ne change rien ici, garde les inputs comme ils étaient) */}
       {/* Je te remets juste le début pour que tu te repères, mais garde tes inputs tels quels */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-navy-700 dark:text-navy-300">Nom du parent <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            name="parentName"
            required
            value={formData.parentName}
            onChange={handleChange}
            className="w-full bg-cream dark:bg-navy-950 border border-gray-200 dark:border-navy-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all dark:text-white" 
            placeholder="Votre nom" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-navy-700 dark:text-navy-300">Email <span className="text-red-500">*</span></label>
          <input 
            type="email" 
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-cream dark:bg-navy-950 border border-gray-200 dark:border-navy-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all dark:text-white" 
            placeholder="votre@email.com" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-navy-700 dark:text-navy-300">Téléphone <span className="text-red-500">*</span></label>
        <input 
          type="tel" 
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full bg-cream dark:bg-navy-950 border border-gray-200 dark:border-navy-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all dark:text-white" 
          placeholder="06..." 
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-navy-700 dark:text-navy-300">Classe de l'élève <span className="text-xs font-normal text-gray-400">(Facultatif)</span></label>
          <select 
            name="studentClass"
            value={formData.studentClass}
            onChange={handleChange}
            className="w-full bg-cream dark:bg-navy-950 border border-gray-200 dark:border-navy-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all dark:text-white"
          >
            <option value="">Sélectionner...</option>
            <option>Collège</option>
            <option>Lycée (Seconde)</option>
            <option>Lycée (Première)</option>
            <option>Lycée (Terminale)</option>
            <option>Supérieur</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-navy-700 dark:text-navy-300">Matière principale <span className="text-xs font-normal text-gray-400">(Facultatif)</span></label>
          <select 
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-cream dark:bg-navy-950 border border-gray-200 dark:border-navy-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all dark:text-white"
          >
            <option value="">Sélectionner...</option>
            <option>Mathématiques</option>
            <option>Physique-Chimie</option>
            <option>Français</option>
            <option>Anglais</option>
            <option>Aide aux devoirs (Général)</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-navy-700 dark:text-navy-300">Précisions <span className="text-xs font-normal text-gray-400">(Facultatif)</span></label>
        <textarea 
            name="details"
            value={formData.details}
            onChange={handleChange}
            className="w-full bg-cream dark:bg-navy-950 border border-gray-200 dark:border-navy-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all h-24 dark:text-white resize-none" 
            placeholder="Difficultés rencontrées, disponibilités..."
        ></textarea>
      </div>

      <button 
        disabled={status === 'loading'}
        className="bg-navy-900 hover:bg-navy-800 text-white px-8 py-4 rounded-xl font-bold w-full transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {status === 'loading' ? (
            <>
                <Loader2 className="animate-spin" size={20} />
                Envoi en cours...
            </>
        ) : (
            "Envoyer ma demande"
        )}
      </button>
      <p className="text-[10px] text-navy-400 text-center mt-2">
        Les données sont destinées au service pédagogique de Via Schola. Conformément au RGPD, vous disposez d'un droit d'accès.
      </p>
    </form>
  );
};

export default ContactForm;