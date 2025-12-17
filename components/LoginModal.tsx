
import React, { useState } from 'react';
import { X, Lock, User, GraduationCap, AlertCircle, Loader2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  type: 'family' | 'teacher' | null;
  onClose: () => void;
  onLoginSuccess: (view: 'dashboard-famille' | 'dashboard-enseignant') => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, type, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !type) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulation réseau
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === 'admin@via-schola.fr' && password === 'admin') {
       setIsLoading(false);
       if (type === 'family') onLoginSuccess('dashboard-famille');
       if (type === 'teacher') onLoginSuccess('dashboard-enseignant');
       onClose();
       // Reset
       setEmail('');
       setPassword('');
    } else {
        setIsLoading(false);
        setError('Identifiants incorrects. Essayez admin@via-schola.fr / admin');
    }
  };

  const isTeacher = type === 'teacher';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white dark:bg-navy-900 rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 border border-navy-100 dark:border-navy-800 overflow-hidden">
        
        {/* Header */}
        <div className={`p-6 text-center text-white ${isTeacher ? 'bg-violet-600' : 'bg-gold-500'}`}>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-inner">
                {isTeacher ? <GraduationCap size={32} /> : <User size={32} />}
            </div>
            <h2 className="text-2xl font-serif font-bold text-white">
                {isTeacher ? 'Espace Enseignant' : 'Espace Famille'}
            </h2>
            <p className="text-white/80 text-sm mt-1">
                {isTeacher ? 'Accédez à vos missions et déclarations' : 'Suivez la réussite de vos enfants'}
            </p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-5">
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                    <AlertCircle size={16} /> {error}
                </div>
            )}

            <div className="space-y-2">
                <label className="text-sm font-bold text-navy-900 dark:text-white">Email</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-700 rounded-xl focus:ring-2 focus:ring-navy-900 outline-none transition-all dark:text-white"
                        placeholder="votre@email.com"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <label className="text-sm font-bold text-navy-900 dark:text-white">Mot de passe</label>
                    <a href="#" className="text-xs text-navy-400 hover:text-navy-600">Oublié ?</a>
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-700 rounded-xl focus:ring-2 focus:ring-navy-900 outline-none transition-all dark:text-white"
                        placeholder="••••••••"
                        required
                    />
                </div>
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 ${isTeacher ? 'bg-violet-600 hover:bg-violet-700 shadow-violet-500/20' : 'bg-navy-900 hover:bg-navy-800 shadow-navy-900/20'}`}
            >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Se connecter'}
            </button>
        </form>

        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
            <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
