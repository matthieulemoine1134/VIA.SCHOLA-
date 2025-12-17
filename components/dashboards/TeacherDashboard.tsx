
import React from 'react';
import { Calendar, Users, CheckCircle, Clock, ChevronRight, FilePlus, MapPin } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-10">
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-navy-900">Bonjour Juliette,</h1>
                    <p className="text-gray-500 mt-1">Vous avez <span className="font-bold text-violet-600">2 cours</span> prévus cette semaine.</p>
                </div>
                <div className="flex gap-3">
                     <button className="bg-white border border-gray-200 text-navy-900 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                        Mon Planning
                     </button>
                     <button className="bg-violet-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/20 flex items-center gap-2">
                        <FilePlus size={18} /> Déclarer des heures
                     </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-1">Heures ce mois</div>
                    <div className="text-3xl font-bold text-navy-900">24h</div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-1">Élèves suivis</div>
                    <div className="text-3xl font-bold text-navy-900">4</div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-1">Revenus (Est.)</div>
                    <div className="text-3xl font-bold text-green-600">528 €</div>
                </div>
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-1">Bilans à faire</div>
                    <div className="text-3xl font-bold text-orange-500">1</div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                
                {/* Upcoming Classes */}
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
                        <Calendar className="text-violet-600" /> Prochains Cours
                    </h2>
                    
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                        {/* Course Item 1 */}
                        <div className="p-5 flex items-center gap-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                             <div className="flex flex-col items-center min-w-[60px]">
                                <span className="text-xs font-bold text-gray-400 uppercase">MAR</span>
                                <span className="text-2xl font-bold text-navy-900">14</span>
                             </div>
                             <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-navy-900 text-lg">Paul Lemoine</h3>
                                    <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded text-xs font-bold">Maths (Spé)</span>
                                </div>
                                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                    <span className="flex items-center gap-1"><Clock size={14} /> 17h30 - 19h00</span>
                                    <span className="flex items-center gap-1"><MapPin size={14} /> Narbonne (Centre)</span>
                                </div>
                             </div>
                             <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-navy-900 hover:text-white transition-colors">
                                <ChevronRight size={18} />
                             </button>
                        </div>

                         {/* Course Item 2 */}
                        <div className="p-5 flex items-center gap-6 hover:bg-gray-50 transition-colors">
                             <div className="flex flex-col items-center min-w-[60px]">
                                <span className="text-xs font-bold text-gray-400 uppercase">JEU</span>
                                <span className="text-2xl font-bold text-navy-900">16</span>
                             </div>
                             <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-navy-900 text-lg">Léa Dupont</h3>
                                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">Physique</span>
                                </div>
                                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                    <span className="flex items-center gap-1"><Clock size={14} /> 14h00 - 15h30</span>
                                    <span className="flex items-center gap-1"><MapPin size={14} /> Sigean</span>
                                </div>
                             </div>
                             <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-navy-900 hover:text-white transition-colors">
                                <ChevronRight size={18} />
                             </button>
                        </div>
                    </div>
                </div>

                {/* My Students */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
                        <Users className="text-gold-500" /> Mes Élèves
                    </h2>
                    
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
                        {[
                            { name: 'Paul Lemoine', class: 'Terminale', status: 'Actif' },
                            { name: 'Léa Dupont', class: '3ème', status: 'Actif' },
                            { name: 'Lucas Martin', class: '1ère', status: 'En pause' },
                        ].map((student, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-navy-700 text-sm">
                                        {student.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-navy-900 text-sm">{student.name}</p>
                                        <p className="text-xs text-gray-500">{student.class}</p>
                                    </div>
                                </div>
                                {student.status === 'Actif' ? (
                                    <CheckCircle size={16} className="text-green-500" />
                                ) : (
                                    <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                                )}
                            </div>
                        ))}
                        
                        <button className="w-full mt-4 py-2 border border-dashed border-gray-300 rounded-xl text-sm font-bold text-gray-500 hover:border-violet-400 hover:text-violet-600 transition-colors">
                            Voir tous les dossiers
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
};

export default TeacherDashboard;
