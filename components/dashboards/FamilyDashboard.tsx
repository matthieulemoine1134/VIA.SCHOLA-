
import React from 'react';
import { Clock, Calendar, FileText, Download, Wallet, Star } from 'lucide-react';

const FamilyDashboard: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-10">
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
            
            {/* Welcome Header */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-navy-900 mb-2">Bonjour Matthieu,</h1>
                    <p className="text-navy-500">Heureux de vous revoir sur votre espace Via Schola.</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right hidden md:block">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Solde d'heures</p>
                        <p className="text-2xl font-bold text-gold-500">12h 30min</p>
                    </div>
                    <button className="bg-navy-900 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-navy-800 transition-colors">
                        Recharger mon compte
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                
                {/* Main Card: Next Class */}
                <div className="md:col-span-2 bg-gradient-to-br from-navy-900 to-navy-800 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600 opacity-20 rounded-full blur-[80px]"></div>
                    
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <span className="bg-white/10 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">
                                    Prochain Cours Confirmé
                                </span>
                                <h2 className="text-3xl font-serif font-bold">Mathématiques (Spé)</h2>
                                <p className="text-navy-200 mt-1">Avec Juliette Sagot</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-2xl text-center backdrop-blur-sm border border-white/10">
                                <p className="text-sm font-bold text-white uppercase">MAR</p>
                                <p className="text-3xl font-bold text-gold-400">14</p>
                                <p className="text-xs font-bold text-white">OCT</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg"><Clock size={20} className="text-gold-400"/></div>
                                <div>
                                    <p className="text-xs text-navy-300 uppercase font-bold">Horaire</p>
                                    <p className="font-bold">17h30 - 19h00</p>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-white/10"></div>
                            <div>
                                <p className="text-xs text-navy-300 uppercase font-bold">Élève</p>
                                <p className="font-bold">Paul (Terminale)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats / Wallet */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-navy-900 flex items-center gap-2 mb-6">
                            <Wallet className="text-violet-600" /> Mon Portefeuille
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                <span className="text-sm font-medium text-gray-600">Crédit restant</span>
                                <span className="font-bold text-navy-900">12h 30m</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                <span className="text-sm font-medium text-gray-600">Validité</span>
                                <span className="font-bold text-navy-900">30 Juin 2025</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-100">
                                <span className="text-sm font-medium text-green-700">Avantage Fiscal (2025)</span>
                                <span className="font-bold text-green-700">- 450 €</span>
                            </div>
                        </div>
                    </div>
                    <button className="w-full mt-4 text-violet-600 font-bold text-sm hover:underline">Voir l'historique détaillé</button>
                </div>
            </div>

            {/* Documents & Suivi */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-navy-900 flex items-center gap-2 mb-6 text-lg">
                        <FileText className="text-navy-400" /> Documents Récents
                    </h3>
                    <div className="space-y-3">
                        {[
                            { name: 'Facture Octobre 2025', date: '01/10/2025', type: 'PDF' },
                            { name: 'Bilan Pédagogique - Trimestre 1', date: '25/09/2025', type: 'PDF' },
                            { name: 'Attestation Fiscale 2024', date: '15/01/2025', type: 'PDF' },
                        ].map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100 group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center font-bold text-xs">PDF</div>
                                    <div>
                                        <p className="font-bold text-navy-900 text-sm group-hover:text-violet-600 transition-colors">{doc.name}</p>
                                        <p className="text-xs text-gray-400">{doc.date}</p>
                                    </div>
                                </div>
                                <Download size={18} className="text-gray-300 group-hover:text-navy-900" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                     <h3 className="font-bold text-navy-900 flex items-center gap-2 mb-6 text-lg">
                        <Star className="text-gold-500" /> Suivi de Paul
                    </h3>
                    <div className="relative pl-6 border-l-2 border-gray-100 space-y-8">
                        <div className="relative">
                            <div className="absolute -left-[29px] w-3 h-3 bg-violet-600 rounded-full border-2 border-white shadow-sm"></div>
                            <p className="text-sm font-bold text-navy-900">Bilan Octobre</p>
                            <p className="text-sm text-gray-600 mt-1 italic">"Paul a fait de gros progrès en analyse de fonctions. Il faut continuer les efforts sur la géométrie dans l'espace."</p>
                            <p className="text-xs text-navy-400 mt-2 font-bold">— Juliette S.</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[29px] w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></div>
                            <p className="text-sm font-bold text-navy-900">Cours du 28/09</p>
                            <p className="text-sm text-gray-600 mt-1">Révision DS Maths. Chapitre : Probabilités.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
};

export default FamilyDashboard;
