import React, { useState, useRef } from 'react';
import { Loader2, CheckCircle, UploadCloud, FileText, X } from 'lucide-react';

interface CandidatureFormProps {
  onSuccess?: () => void;
}

const SUBJECTS = [
  "Mathématiques",
  "Français",
  "Physique-Chimie",
  "Anglais",
  "Espagnol",
  "Aide aux devoirs (Primaire/Collège)",
  "Autre"
];

const CandidatureForm: React.FC<CandidatureFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !file || selectedSubjects.length === 0) return;

    setStatus('loading');

    // Création du paquet de données "Spécial Fichier"
    const submissionData = new FormData();
    submissionData.append("form-name", "candidature-narbonne");
    submissionData.append("name", formData.name);
    submissionData.append("email", formData.email);
    submissionData.append("phone", formData.phone);
    submissionData.append("message", formData.message);
    // On transforme la liste des matières en une seule ligne de texte
    submissionData.append("subjects", selectedSubjects.join(", "));
    // On ajoute le fichier
    submissionData.append("cv", file);

    try {
      await fetch("/", {
        method: "POST",
        body: submissionData,
        // Important : Ne pas mettre de 'Content-Type' ici, le navigateur le gère tout seul pour les fichiers
      });
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSelectedSubjects([]);
      setFile(null);
  
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
          setStatus('idle');
        }, 3000);
      }
    } catch (error) {
      alert("Erreur lors de l'envoi du dossier. Veuillez réessayer.");
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-serif font-bold text-navy-900 dark:text-white mb-3">Candidature envoyée !</h3>
        <p className="text-navy-600 dark:text-navy-300 mb-8 max-w-md">
            Merci de votre intérêt pour Via Schola. Notre responsable pédagogique va étudier votre CV et vous recontactera rapidement.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-navy-700 dark:text-navy-300">Nom complet <span className="text-red-500">*</span></label>
        <input 
          type="text" 
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-cream dark:bg-navy-950 border border-gray-200 dark:border-navy-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all dark:text-white" 
          placeholder="Votre Prénom et Nom" 
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
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
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-navy-700 dark:text-navy-300">Matières enseignées <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-2 gap-2">
          {SUBJECTS.map((subject) => (
            <label key={subject} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedSubjects.includes(subject) ? 'bg-violet-600 border-violet-600' : 'bg-white border-gray-300'}`}>
                {selectedSubjects.includes(subject) && <CheckCircle size={14} className="text-white" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden"
                checked={selectedSubjects.includes(subject)}
                onChange={() => handleSubjectToggle(subject)}
              />
              <span className="text-sm text-navy-600 dark:text-navy-300 group-hover:text-navy-900 dark:group-hover:text-white transition-colors">{subject}</span>
            </label>
          ))}
        </div>
         {selectedSubjects.length === 0 && <p className="text-xs text-red-400">Veuillez sélectionner au moins une matière.</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-navy-700 dark:text-navy-300">CV (PDF ou Word) <span className="text-red-500">*</span></label>
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all
            ${isDragOver 
              ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20' 
              : 'border-gray-300 dark:border-navy-700 hover:border-violet-400 bg-cream dark:bg-navy-950'}
          `}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="hidden" 
          />
          
          {file ? (
            <div className="flex items-center gap-3 bg-white dark:bg-navy-900 px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-700 shadow-sm">
              <FileText className="text-violet-600" size={24} />
              <div className="text-left">
                <p className="text-sm font-semibold text-navy-900 dark:text-white truncate max-w-[180px]">{file.name}</p>
                <p className="text-xs text-navy-400">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-navy-800 rounded-full"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>
          ) : (
            <>
              <UploadCloud className={`mb-2 ${isDragOver ? 'text-violet-600' : 'text-gray-400'}`} size={32} />
              <p className="text-sm text-navy-600 dark:text-navy-300 font-medium">Glissez votre CV ici</p>
              <p className="text-xs text-navy-400 mt-1">ou cliquez pour parcourir</p>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-navy-700 dark:text-navy-300">Message (Motivation)</label>
        <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-cream dark:bg-navy-950 border border-gray-200 dark:border-navy-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all h-24 dark:text-white resize-none" 
            placeholder="Pourquoi souhaitez-vous rejoindre Via Schola ?"
        ></textarea>
      </div>

      <button 
        disabled={status === 'loading' || !file || selectedSubjects.length === 0}
        className="bg-navy-900 hover:bg-navy-800 text-white px-8 py-4 rounded-xl font-bold w-full transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {status === 'loading' ? (
            <>
                <Loader2 className="animate-spin" size={20} />
                Envoi en cours...
            </>
        ) : (
            "Envoyer ma candidature"
        )}
      </button>
    </form>
  );
};

export default CandidatureForm;