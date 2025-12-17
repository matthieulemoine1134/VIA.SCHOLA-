
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, GraduationCap, Network, FileCheck, Lock, 
  Search, CheckCircle, Clock, AlertCircle, TrendingUp, DollarSign,
  PlusCircle, UserCheck, Calendar, Briefcase, ChevronRight, LogOut,
  Phone, Mail, Target, ArrowRight, BatteryWarning, UserPlus, FileText
} from 'lucide-react';
import { MOCK_FAMILIES, MOCK_TEACHERS, MOCK_MISSIONS, MOCK_REPORTS, MOCK_FINANCIALS } from '../../data/mockCrmData';
import { Family, Teacher } from '../../types';

interface CrmDashboardProps {
    onLogout: () => void;
}

type CrmTab = 'dashboard' | 'commercial' | 'recrutement' | 'matching' | 'suivi' | 'admin';

const CrmDashboard: React.FC<CrmDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<CrmTab>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{families: Family[], teachers: Teacher[]} | null>(null);

  // Search Logic
  useEffect(() => {
    if (searchQuery.length > 2) {
      const lowerQ = searchQuery.toLowerCase();
      const families = MOCK_FAMILIES.filter(f => 
        f.name.toLowerCase().includes(lowerQ) || 
        f.email.toLowerCase().includes(lowerQ) || 
        f.phone.replace(/\s/g, '').includes(lowerQ.replace(/\s/g, '')) ||
        f.children.some(c => c.toLowerCase().includes(lowerQ))
      );
      const teachers = MOCK_TEACHERS.filter(t => 
        t.name.toLowerCase().includes(lowerQ) || 
        t.email.toLowerCase().includes(lowerQ) || 
        t.phone.replace(/\s/g, '').includes(lowerQ.replace(/\s/g, ''))
      );
      setSearchResults({ families, teachers });
    } else {
      setSearchResults(null);
    }
  }, [searchQuery]);

  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (password === 'admin') {
          setIsAuthenticated(true);
      } else {
          alert('Mot de passe incorrect (Indice: admin)');
      }
  };

  if (!isAuthenticated) {
      return (
          <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center border border-navy-800">
                  <div className="w-16 h-16 bg-navy-100 text-navy-900 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Lock size={32} />
                  </div>
                  <h1 className="text-2xl font-serif font-bold text-navy-900 mb-2">Via Schola Admin</h1>
                  <p className="text-gray-500 mb-8">Espace de pilotage sécurisé</p>
                  
                  <form onSubmit={handleLogin} className="space-y-4">
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gold-500 outline-none"
                      />
                      <button type="submit" className="w-full bg-navy-900 text-white py-3 rounded-xl font-bold hover:bg-navy-800 transition-colors shadow-lg">
                          Connexion
                      </button>
                  </form>
                  <button onClick={onLogout} className="mt-6 text-sm text-gray-400 hover:text-navy-900 transition-colors">
                      Retour au site public
                  </button>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-900 text-white flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="p-6 border-b border-navy-800">
            <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <span className="bg-gold-500 text-navy-900 px-1.5 py-0.5 rounded text-sm font-sans font-extrabold">VS</span>
                PILOTAGE
            </h2>
            <p className="text-navy-400 text-xs mt-2 opacity-60">Administration Via Schola</p>
        </div>

        <nav className="flex-grow p-4 space-y-2">
            <SidebarItem icon={<LayoutDashboard size={20}/>} label="Vue d'ensemble" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            <div className="pt-6 pb-2 text-[10px] font-bold text-navy-500 uppercase tracking-widest px-3">Pôles</div>
            <SidebarItem icon={<Users size={20}/>} label="Commercial" active={activeTab === 'commercial'} onClick={() => setActiveTab('commercial')} />
            <SidebarItem icon={<GraduationCap size={20}/>} label="RH Professeurs" active={activeTab === 'recrutement'} onClick={() => setActiveTab('recrutement')} />
            <SidebarItem icon={<Network size={20}/>} label="Matching" active={activeTab === 'matching'} onClick={() => setActiveTab('matching')} />
            <SidebarItem icon={<FileCheck size={20}/>} label="Suivi Pédagogique" active={activeTab === 'suivi'} onClick={() => setActiveTab('suivi')} />
        </nav>

        <div className="p-4 border-t border-navy-800 bg-navy-950">
             <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2 text-navy-400 hover:text-red-400 transition-colors w-full text-sm font-medium">
                 <LogOut size={18} />
                 <span>Déconnexion</span>
             </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
         {/* Global Header & Search */}
         <div className="flex justify-between items-center mb-10 relative">
             <h1 className="text-3xl font-bold text-navy-900 font-serif capitalize tracking-tight">
                 {activeTab === 'dashboard' ? 'Tableau de Bord' : activeTab.replace('-', ' ')}
             </h1>
             
             <div className="flex items-center gap-6 relative z-30">
                 {/* Smart Search Bar */}
                 <div className="relative group">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold-500 transition-colors" size={18} />
                     <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher (Nom, Tél, Mail...)" 
                        className="pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-transparent w-80 bg-white shadow-sm transition-all" 
                     />
                     
                     {/* Search Results Dropdown */}
                     {searchResults && (
                         <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                             <div className="p-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wide">
                                 Résultats
                             </div>
                             <div className="max-h-80 overflow-y-auto">
                                 {searchResults.families.length === 0 && searchResults.teachers.length === 0 && (
                                     <div className="p-4 text-center text-gray-400 text-sm">Aucun résultat trouvé.</div>
                                 )}
                                 
                                 {searchResults.families.length > 0 && (
                                     <div>
                                         <div className="px-4 py-2 text-xs font-bold text-violet-600 bg-violet-50">Familles</div>
                                         {searchResults.families.map(f => (
                                             <div key={f.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0" onClick={() => { setActiveTab('commercial'); setSearchQuery(''); }}>
                                                 <p className="font-bold text-navy-900 text-sm">{f.name}</p>
                                                 <p className="text-xs text-gray-500">{f.children.join(', ')} • {f.city}</p>
                                             </div>
                                         ))}
                                     </div>
                                 )}

                                 {searchResults.teachers.length > 0 && (
                                     <div>
                                         <div className="px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50">Professeurs</div>
                                         {searchResults.teachers.map(t => (
                                             <div key={t.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0" onClick={() => { setActiveTab('recrutement'); setSearchQuery(''); }}>
                                                 <p className="font-bold text-navy-900 text-sm">{t.name}</p>
                                                 <p className="text-xs text-gray-500">{t.subjects.join(', ')} • {t.phone}</p>
                                             </div>
                                         ))}
                                     </div>
                                 )}
                             </div>
                         </div>
                     )}
                 </div>

                 <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                     <div className="text-right hidden md:block">
                         <p className="text-sm font-bold text-navy-900">Direction</p>
                         <p className="text-xs text-green-600 flex items-center justify-end gap-1">
                             <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> En ligne
                         </p>
                     </div>
                     <div className="w-10 h-10 bg-navy-900 rounded-full flex items-center justify-center font-bold text-white shadow-lg border-2 border-white ring-2 ring-gray-100">
                         JD
                     </div>
                 </div>
             </div>
         </div>

         {/* Views */}
         {activeTab === 'dashboard' && <DashboardView />}
         {activeTab === 'commercial' && <CommercialView />}
         {activeTab === 'recrutement' && <RecrutementView />}
         {activeTab === 'matching' && <MatchingView />}
         {activeTab === 'suivi' && <SuiviView />}

      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-sm ${active ? 'bg-gold-500 text-navy-900 font-bold shadow-lg shadow-gold-500/20' : 'text-navy-300 hover:bg-navy-800 hover:text-white'}`}
    >
        {icon}
        <span>{label}</span>
        {active && <ChevronRight size={14} className="ml-auto opacity-50" />}
    </button>
);

// --- DASHBOARD VIEW (Redesigned) ---

const DashboardView = () => {
    // Generate derived tasks based on mock data
    const leadsToContact = MOCK_FAMILIES.filter(f => f.status === 'Lead').length;
    const renewalNeeded = MOCK_FAMILIES.filter(f => f.status === 'Client' && f.remainingHours < 4).length;
    const pendingMatching = MOCK_MISSIONS.filter(m => m.status === 'En recherche').length;
    const candidates = MOCK_TEACHERS.filter(t => t.status === 'Candidat').length;
    
    return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* KPI Section - Row 1: Humans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                icon={<Users className="text-white" />} 
                iconBg="bg-violet-600"
                title="Familles Actives" 
                value={MOCK_FAMILIES.filter(f => f.status === 'Client').length} 
                subtext="En suivi"
            />
            <StatCard 
                icon={<Phone className="text-white" />} 
                iconBg="bg-orange-500"
                title="Leads" 
                value={leadsToContact} 
                subtext="À contacter"
            />
            <StatCard 
                icon={<GraduationCap className="text-white" />} 
                iconBg="bg-blue-600"
                title="Profs Actifs" 
                value={MOCK_TEACHERS.filter(t => t.status === 'Actif').length} 
                subtext="Validés"
            />
             <StatCard 
                icon={<FileText className="text-white" />} 
                iconBg="bg-pink-500"
                title="Candidats" 
                value={candidates} 
                subtext="À auditer"
            />
        </div>

        {/* KPI Section - Row 2: Financials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueCard 
                title="CA Mensuel (Octobre)"
                signed={MOCK_FINANCIALS.month.signed}
                pipe={MOCK_FINANCIALS.month.pipe}
                objective={MOCK_FINANCIALS.month.objective}
            />
             <RevenueCard 
                title="CA Annuel (2025)"
                signed={MOCK_FINANCIALS.year.signed}
                pipe={MOCK_FINANCIALS.year.pipe}
                objective={MOCK_FINANCIALS.year.objective}
                isYearly
            />
        </div>

        {/* Operational Section - Row 3: Actions (Full Width now) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-navy-900 text-lg flex items-center gap-2">
                    <CheckCircle size={20} className="text-green-500" />
                    À Traiter (Urgent)
                </h3>
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">{leadsToContact + renewalNeeded + pendingMatching + 1} tâches</span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Leads */}
                {MOCK_FAMILIES.filter(f => f.status === 'Lead').map(f => (
                    <TaskItem 
                        key={'lead-'+f.id}
                        type="lead"
                        title={`Lead : ${f.name}`}
                        subtitle={`Reçu le ${f.lastContact} • ${f.city}`}
                        actionLabel="Appeler"
                    />
                ))}

                {/* Matching */}
                {MOCK_MISSIONS.filter(m => m.status === 'En recherche').map(m => (
                    <TaskItem 
                        key={'match-'+m.id}
                        type="match"
                        title={`Match : ${m.familyName}`}
                        subtitle={`${m.subject} (${m.level})`}
                        actionLabel="Trouver Prof"
                    />
                ))}

                {/* Renewals */}
                {MOCK_FAMILIES.filter(f => f.status === 'Client' && f.remainingHours < 4).map(f => (
                        <TaskItem 
                        key={'renew-'+f.id}
                        type="renew"
                        title={`Renouvellement : ${f.name}`}
                        subtitle={`Reste ${f.remainingHours}h • ${f.children[0]}`}
                        actionLabel="Relancer"
                    />
                ))}

                {/* Candidates (Implicitly based on mock logic or hardcoded example for visual) */}
                 {MOCK_TEACHERS.filter(t => t.status === 'Candidat').map(t => (
                    <TaskItem 
                        key={'candidat-'+t.id}
                        type="candidate"
                        title={`Candidat : ${t.name}`}
                        subtitle={`${t.subjects[0]} • ${t.cities[0]}`}
                        actionLabel="Auditer"
                    />
                ))}

                {/* Hardcoded Satisfaction Survey Example */}
                    <TaskItem 
                    type="survey"
                    title="Enquête Satisfaction"
                    subtitle="Famille Bernard (1er cours)"
                    actionLabel="Envoyer"
                />

            </div>
        </div>
    </div>
    );
};

// --- Custom Components for Dashboard ---

const RevenueCard = ({ title, signed, pipe, objective, isYearly = false }: any) => {
    const signedPercent = Math.min((signed / objective) * 100, 100);
    const pipePercent = Math.min((pipe / objective) * 100, 100 - signedPercent); // Stack on top

    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${isYearly ? 'bg-indigo-100 text-indigo-600' : 'bg-green-100 text-green-600'}`}>
                        <TrendingUp size={18} />
                    </div>
                    <span className="text-sm font-bold text-gray-500">{title}</span>
                </div>
                <div className="text-right">
                    <p className="text-xl font-extrabold text-navy-900">{signed.toLocaleString('fr-FR')} €</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Signé</p>
                </div>
            </div>

            {/* Progress Bar Container */}
            <div className="relative pt-2">
                <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-gold-600">En attente (Devis): {pipe.toLocaleString('fr-FR')} €</span>
                    <span className="text-gray-400">Obj: {objective.toLocaleString('fr-FR')} €</span>
                </div>
                
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden flex relative">
                    {/* Signed Bar */}
                    <div 
                        className={`h-full ${isYearly ? 'bg-indigo-500' : 'bg-green-500'} transition-all duration-1000`} 
                        style={{ width: `${signedPercent}%` }}
                    ></div>
                    {/* Pipe Bar */}
                    <div 
                        className={`h-full ${isYearly ? 'bg-indigo-300/50' : 'bg-green-300/50'} relative`} 
                        style={{ width: `${pipePercent}%` }}
                    >
                         {/* Striped pattern for pipe */}
                        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}></div>
                    </div>
                </div>
                
                {/* Completion Rate */}
                <div className="mt-2 text-right">
                     <span className={`text-xs font-bold ${signed + pipe >= objective ? 'text-green-600' : 'text-orange-500'}`}>
                        {Math.round(((signed + pipe) / objective) * 100)}% de l'objectif
                     </span>
                </div>
            </div>
        </div>
    );
};

const TaskItem = ({ type, title, subtitle, actionLabel }: any) => {
    let icon, colorClass, btnClass;
    
    switch(type) {
        case 'lead': 
            icon = <Phone size={18} />; 
            colorClass = "bg-blue-50 text-blue-600 border-blue-100";
            btnClass = "text-blue-600 hover:bg-blue-100";
            break;
        case 'match': 
            icon = <Network size={18} />; 
            colorClass = "bg-red-50 text-red-600 border-red-100";
            btnClass = "text-red-600 hover:bg-red-100";
            break;
        case 'renew': 
            icon = <BatteryWarning size={18} />; 
            colorClass = "bg-orange-50 text-orange-600 border-orange-100";
            btnClass = "text-orange-600 hover:bg-orange-100";
            break;
        case 'candidate': 
            icon = <UserPlus size={18} />; 
            colorClass = "bg-pink-50 text-pink-600 border-pink-100";
            btnClass = "text-pink-600 hover:bg-pink-100";
            break;
        case 'survey':
            icon = <FileCheck size={18} />; 
            colorClass = "bg-purple-50 text-purple-600 border-purple-100";
            btnClass = "text-purple-600 hover:bg-purple-100";
            break;
        default:
            icon = <CheckCircle size={18} />;
            colorClass = "bg-gray-50 text-gray-600";
            btnClass = "text-gray-600 hover:bg-gray-100";
    }

    return (
        <div className={`flex items-center justify-between p-4 rounded-xl border ${colorClass} transition-transform hover:scale-[1.01] bg-white bg-opacity-40`}>
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm ${colorClass.split(' ')[1]}`}>
                    {icon}
                </div>
                <div>
                    <h4 className="font-bold text-navy-900 text-sm truncate max-w-[140px]" title={title}>{title}</h4>
                    <p className="text-xs text-navy-500 mt-0.5 truncate max-w-[140px]">{subtitle}</p>
                </div>
            </div>
            <button className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors ${btnClass}`}>
                {actionLabel}
            </button>
        </div>
    );
}

// --- STANDARD VIEWS (Kept similar but styled) ---

const CommercialView = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-navy-900">Familles & Prospects</h3>
            <button className="flex items-center gap-2 bg-navy-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-navy-800">
                <PlusCircle size={16} /> Ajouter
            </button>
        </div>
        <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
                <tr>
                    <th className="px-6 py-4">Famille</th>
                    <th className="px-6 py-4">Ville</th>
                    <th className="px-6 py-4">Enfants</th>
                    <th className="px-6 py-4">Statut</th>
                    <th className="px-6 py-4">Solde H.</th>
                    <th className="px-6 py-4">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {MOCK_FAMILIES.map(f => (
                    <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                            <p className="font-bold text-navy-900">{f.name}</p>
                            <p className="text-xs text-gray-500">{f.email}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{f.city}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{f.children.join(', ')}</td>
                        <td className="px-6 py-4">
                            <StatusBadge status={f.status} />
                        </td>
                         <td className="px-6 py-4">
                            {f.status === 'Client' && (
                                <span className={`text-xs font-bold px-2 py-1 rounded ${f.remainingHours < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                    {f.remainingHours} h
                                </span>
                            )}
                        </td>
                        <td className="px-6 py-4">
                            <button className="text-violet-600 hover:underline text-sm font-semibold">Détails</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const RecrutementView = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-navy-900">Vivier Professeurs</h3>
            <button className="flex items-center gap-2 bg-navy-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-navy-800">
                <PlusCircle size={16} /> Candidat
            </button>
        </div>
        <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
                <tr>
                    <th className="px-6 py-4">Identité</th>
                    <th className="px-6 py-4">Matières</th>
                    <th className="px-6 py-4">Secteur</th>
                    <th className="px-6 py-4">Statut</th>
                    <th className="px-6 py-4">Compétences</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {MOCK_TEACHERS.map(t => (
                    <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                            <p className="font-bold text-navy-900">{t.name}</p>
                            <p className="text-xs text-gray-500">{t.phone}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{t.subjects.join(', ')}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{t.cities.join(', ')}</td>
                        <td className="px-6 py-4">
                             <StatusBadge status={t.status} />
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex gap-1 flex-wrap">
                                {t.skills.map(s => <span key={s} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600">{s}</span>)}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const MatchingView = () => {
    const pendingMissions = MOCK_MISSIONS.filter(m => m.status === 'En recherche' || m.status === 'Proposition');
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h3 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                    <Search size={20} className="text-violet-600" />
                    Demandes en attente
                </h3>
                {pendingMissions.map(mission => (
                    <div key={mission.id} className="bg-white p-5 rounded-xl border border-l-4 border-l-violet-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg text-navy-900">{mission.familyName}</h4>
                            <span className="bg-violet-50 text-violet-700 text-xs font-bold px-2 py-1 rounded">{mission.hoursPerWeek}h/sem</span>
                        </div>
                        <p className="text-gray-600 mb-4">{mission.subject} • {mission.level}</p>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Demandé il y a 2j</span>
                            <span className="text-violet-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                Trouver un prof <ChevronRight size={16} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200 flex flex-col items-center justify-center text-center">
                <Network size={48} className="text-gray-300 mb-4" />
                <h3 className="font-bold text-gray-500 text-lg">Sélectionnez une mission</h3>
                <p className="text-gray-400">L'algorithme de matching vous proposera les meilleurs profs disponibles.</p>
            </div>
        </div>
    );
};

const SuiviView = () => (
    <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-navy-900">Rapports de séances à valider</h3>
            </div>
            <div className="divide-y divide-gray-100">
                {MOCK_REPORTS.map(report => (
                    <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{report.date}</span>
                                <h4 className="font-bold text-navy-900 text-lg mt-1">{report.teacherName} <span className="text-gray-400 font-normal">pour</span> {report.studentName}</h4>
                            </div>
                            {report.status === 'En attente' ? (
                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">À Valider</span>
                            ) : (
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Validé</span>
                            )}
                        </div>
                        <p className="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100 italic">
                            "{report.content}"
                        </p>
                        {report.status === 'En attente' && (
                            <div className="mt-4 flex gap-3">
                                <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-600 flex items-center gap-2">
                                    <CheckCircle size={16} /> Valider
                                </button>
                                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50">
                                    Demander correction
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
);


// --- Helpers ---
const StatCard = ({ icon, iconBg, title, value, subtext }: any) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-36">
        <div className="flex justify-between items-start">
            <div className={`p-3 rounded-xl shadow-md ${iconBg}`}>{icon}</div>
        </div>
        <div>
            <h3 className="text-3xl font-extrabold text-navy-900 mt-2">{value}</h3>
            <div className="flex justify-between items-end">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</p>
                <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full">{subtext}</span>
            </div>
        </div>
    </div>
);

const StatusBadge = ({ status }: { status: string }) => {
    let styles = "bg-gray-100 text-gray-600";
    switch (status) {
        case 'Client': case 'Actif': case 'Validée': case 'Validé': styles = "bg-green-100 text-green-700 border border-green-200"; break;
        case 'Lead': case 'En recherche': case 'Proposition': styles = "bg-blue-100 text-blue-700 border border-blue-200"; break;
        case 'Candidat': case 'En attente': styles = "bg-orange-100 text-orange-700 border border-orange-200"; break;
        case 'Ancien': case 'Inactif': styles = "bg-gray-100 text-gray-500 border border-gray-200"; break;
    }
    return <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles}`}>{status}</span>;
};

export default CrmDashboard;
