
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, GraduationCap, Network, FileCheck, Lock, 
  Search, CheckCircle, Clock, AlertCircle, TrendingUp, DollarSign,
  PlusCircle, UserCheck, Calendar, Briefcase, ChevronRight, LogOut,
  Phone, Mail, Target, ArrowRight, BatteryWarning, UserPlus, FileText,
  MapPin, MoreHorizontal, FileText as FileIcon, X, PenTool, Euro,
  PhoneOutgoing, History, Save, Send, RefreshCw, MessageSquare, Edit, Trash, Plus,
  User, Settings, FileBox, Calculator, Download, ChevronDown, Tag, Percent
} from 'lucide-react';
import { 
    MOCK_FAMILIES, MOCK_TEACHERS, MOCK_MISSIONS, MOCK_REPORTS, MOCK_FINANCIALS,
    MOCK_PRICING, MOCK_ZONES, MOCK_SALARIES, MOCK_DOCUMENTS 
} from '../../data/mockCrmData';
// Fix: Added KanbanColumnDef to imports from types
import { Family, Teacher, PipelineStatus, Activity, PricingRule, GeographicZone, SalaryRule, DocumentTemplate, Child, Mission, KanbanColumnDef } from '../../types';

interface CrmDashboardProps {
    onLogout: () => void;
    initialLeads?: Family[];
}

type CrmTab = 'dashboard' | 'commercial' | 'recrutement' | 'matching' | 'suivi' | 'admin' | 'settings';
type FamilyFilter = 'all' | 'prospects' | 'active' | 'archived';

const AVERAGE_BASKET = 600; 

const CrmDashboard: React.FC<CrmDashboardProps> = ({ onLogout, initialLeads }) => {
  const [activeTab, setActiveTab] = useState<CrmTab>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [leads, setLeads] = useState<Family[]>(initialLeads || MOCK_FAMILIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{families: Family[], teachers: Teacher[]} | null>(null);

  useEffect(() => {
    if (initialLeads) setLeads(initialLeads);
  }, [initialLeads]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const lowerQ = searchQuery.toLowerCase();
      const families = leads.filter(f => 
        f.name.toLowerCase().includes(lowerQ) || 
        f.email.toLowerCase().includes(lowerQ) || 
        f.phone.replace(/\s/g, '').includes(lowerQ.replace(/\s/g, '')) ||
        f.children.some(c => c.firstName.toLowerCase().includes(lowerQ))
      );
      const teachers = MOCK_TEACHERS.filter(t => 
        t.name.toLowerCase().includes(lowerQ) || 
        t.email.toLowerCase().includes(lowerQ)
      );
      setSearchResults({ families, teachers });
    } else {
      setSearchResults(null);
    }
  }, [searchQuery, leads]);

  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (password === 'admin') setIsAuthenticated(true);
      else alert('Mot de passe incorrect (Indice: admin)');
  };

  const handleSearchResultClick = (family: Family) => {
      setSelectedFamily(family);
      setSearchQuery('');
      setSearchResults(null);
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
    <div className="min-h-screen bg-gray-50 flex font-sans overflow-hidden">
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
            <SidebarItem icon={<Users size={20}/>} label="Familles" active={activeTab === 'commercial'} onClick={() => setActiveTab('commercial')} />
            <SidebarItem icon={<GraduationCap size={20}/>} label="RH Professeurs" active={activeTab === 'recrutement'} onClick={() => setActiveTab('recrutement')} />
            <SidebarItem icon={<Network size={20}/>} label="Matching" active={activeTab === 'matching'} onClick={() => setActiveTab('matching')} />
            <SidebarItem icon={<FileCheck size={20}/>} label="Suivi Pédagogique" active={activeTab === 'suivi'} onClick={() => setActiveTab('suivi')} />
        </nav>
        <div className="p-4 border-t border-navy-800 bg-navy-950 space-y-2">
             <SidebarItem icon={<Settings size={20}/>} label="Paramètres" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
             <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2 text-navy-400 hover:text-red-400 transition-colors w-full text-sm font-medium">
                 <LogOut size={18} />
                 <span>Déconnexion</span>
             </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8 h-screen overflow-y-auto bg-gray-100 flex flex-col">
         <div className="flex justify-between items-center mb-6 relative shrink-0">
             <h1 className="text-3xl font-bold text-navy-900 font-serif capitalize tracking-tight">
                 {activeTab === 'dashboard' ? 'Tableau de Bord' : 
                  activeTab === 'commercial' ? 'Gestion Familles' : 
                  activeTab === 'settings' ? 'Paramètres & Configuration' :
                  activeTab.replace('-', ' ')}
             </h1>
             <div className="flex items-center gap-6 relative z-30">
                 <div className="relative group">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold-500 transition-colors" size={18} />
                     <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher (Nom, Tél...)" 
                        className="pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-transparent w-80 bg-white shadow-sm transition-all" 
                     />
                     {searchResults && (
                         <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                             <div className="p-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wide">Résultats</div>
                             <div className="max-h-80 overflow-y-auto">
                                 {searchResults.families.length > 0 && (
                                     <div>
                                         <div className="px-4 py-2 text-xs font-bold text-violet-600 bg-violet-50">Familles</div>
                                         {searchResults.families.map(f => (
                                             <div key={f.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0" onClick={() => handleSearchResultClick(f)}>
                                                 <p className="font-bold text-navy-900 text-sm">{f.name}</p>
                                                 <p className="text-xs text-gray-500">{f.children.map(c => c.firstName).join(', ')} • {f.city}</p>
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
                         <p className="text-xs text-green-600 flex items-center justify-end gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> En ligne</p>
                     </div>
                     <div className="w-10 h-10 bg-navy-900 rounded-full flex items-center justify-center font-bold text-white shadow-lg border-2 border-white ring-2 ring-gray-100">JD</div>
                 </div>
             </div>
         </div>

         <div className="flex-1 overflow-hidden relative">
             {activeTab === 'dashboard' && <DashboardView leads={leads} />}
             {activeTab === 'commercial' && <KanbanBoardView leads={leads} setLeads={setLeads} onLeadClick={setSelectedFamily} />}
             {activeTab === 'recrutement' && <div className="overflow-y-auto h-full"><RecrutementView /></div>}
             {activeTab === 'matching' && <div className="overflow-y-auto h-full"><MatchingView /></div>}
             {activeTab === 'suivi' && <div className="overflow-y-auto h-full"><SuiviView /></div>}
             {activeTab === 'settings' && <div className="overflow-y-auto h-full"><SettingsView /></div>}
         </div>

         {selectedFamily && (
            <LeadDetailPanel 
                lead={selectedFamily} 
                onClose={() => setSelectedFamily(null)} 
                onUpdate={(updatedLead) => {
                    setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
                    setSelectedFamily(updatedLead);
                }}
            />
         )}
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-sm ${active ? 'bg-gold-500 text-navy-900 font-bold shadow-lg shadow-gold-500/20' : 'text-navy-300 hover:bg-navy-800 hover:text-white'}`}>
        {icon}
        <span>{label}</span>
        {active && <ChevronRight size={14} className="ml-auto opacity-50" />}
    </button>
);

// --- LEAD DETAIL PANEL ---
const LeadDetailPanel = ({ lead, onClose, onUpdate }: { lead: Family, onClose: () => void, onUpdate: (l: Family) => void }) => {
    const [activeTab, setActiveTab] = useState<'infos' | 'enfants' | 'contrats' | 'suivi'>('infos');
    const [isEditing, setIsEditing] = useState(false);
    const [note, setNote] = useState('');
    const [editedLead, setEditedLead] = useState<Family>(lead);
    
    // Contract Generator State
    const [contractConfig, setContractConfig] = useState({
        childId: lead.children[0]?.id || '',
        level: 'Collège',
        subject: 'Mathématiques',
        duration: 1.5,
        sessionsPerWeek: 1,
        weeks: 10,
        hourlyRate: 42,
        fees: 79,
        discount: 0
    });

    const [showContractSuccess, setShowContractSuccess] = useState(false);

    // Calculate Contract Totals
    const totalHours = contractConfig.duration * contractConfig.sessionsPerWeek * contractConfig.weeks;
    const subtotal = totalHours * contractConfig.hourlyRate;
    const finalTotal = subtotal + contractConfig.fees - contractConfig.discount;

    const handleSaveInfos = () => {
        const updatedLead = { ...editedLead, name: editedLead.lastName, lastContact: new Date().toISOString().split('T')[0] };
        onUpdate(updatedLead);
        setIsEditing(false);
    };

    const handleAddNote = () => {
        if (!note.trim()) return;
        const newActivity: Activity = {
            id: Date.now().toString(),
            type: 'note',
            content: note,
            date: new Date().toISOString().split('T')[0],
            user: 'Vous'
        };
        onUpdate({ ...lead, activities: [newActivity, ...lead.activities] });
        setNote('');
    };

    const handleGenerateContract = () => {
        const newActivity: Activity = {
            id: Date.now().toString(),
            type: 'contract',
            content: `Nouveau contrat généré pour ${lead.children.find(c => c.id === contractConfig.childId)?.firstName} : ${totalHours}h de ${contractConfig.subject} (${contractConfig.level}). Total : ${finalTotal}€`,
            date: new Date().toISOString().split('T')[0],
            user: 'Vous'
        };
        onUpdate({ 
            ...lead, 
            activities: [newActivity, ...lead.activities], 
            potentialValue: finalTotal, 
            status: 'Contrat' as PipelineStatus 
        });
        setShowContractSuccess(true);
        setTimeout(() => setShowContractSuccess(false), 3000);
    };

    return (
        <div className="fixed inset-y-0 right-0 w-[650px] bg-white shadow-2xl border-l border-gray-200 z-[60] flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="bg-navy-900 text-white p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-serif font-bold">{lead.civility} {lead.lastName} {lead.firstName}</h2>
                        <p className="text-navy-300 text-sm mt-1 flex items-center gap-2">
                            <MapPin size={14} /> {lead.zipCity} • <span className="text-gold-400 font-bold uppercase tracking-widest text-[10px]">{lead.status}</span>
                        </p>
                    </div>
                    <button onClick={onClose} className="text-navy-400 hover:text-white transition-colors"><X size={24} /></button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 bg-white">
                <button onClick={() => setActiveTab('infos')} className={`flex-1 py-4 text-xs font-bold border-b-2 ${activeTab === 'infos' ? 'border-navy-900 text-navy-900' : 'border-transparent text-gray-400 hover:text-navy-700 uppercase'}`}>Infos Perso</button>
                <button onClick={() => setActiveTab('enfants')} className={`flex-1 py-4 text-xs font-bold border-b-2 ${activeTab === 'enfants' ? 'border-navy-900 text-navy-900' : 'border-transparent text-gray-400 hover:text-navy-700 uppercase'}`}>Fiche Enfant</button>
                <button onClick={() => setActiveTab('contrats')} className={`flex-1 py-4 text-xs font-bold border-b-2 ${activeTab === 'contrats' ? 'border-navy-900 text-navy-900' : 'border-transparent text-gray-400 hover:text-navy-700 uppercase'}`}>Contrats</button>
                <button onClick={() => setActiveTab('suivi')} className={`flex-1 py-4 text-xs font-bold border-b-2 ${activeTab === 'suivi' ? 'border-navy-900 text-navy-900' : 'border-transparent text-gray-400 hover:text-navy-700 uppercase'}`}>Suivi</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                
                {/* 1. INFOS PERSONNELLES */}
                {activeTab === 'infos' && (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-navy-900 flex items-center gap-2"><User size={18} className="text-violet-600"/> État Civil & Contact</h3>
                                <button onClick={() => setIsEditing(!isEditing)} className="text-xs font-bold text-violet-600 hover:underline">{isEditing ? 'Annuler' : 'Modifier'}</button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Source</label>
                                    {isEditing ? <input value={editedLead.source} onChange={e => setEditedLead({...editedLead, source: e.target.value})} className="w-full border rounded p-2 text-sm mt-1" /> : <p className="font-bold text-navy-900">{lead.source || '-'}</p>}
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Civilité</label>
                                    {isEditing ? <select value={editedLead.civility} onChange={e => setEditedLead({...editedLead, civility: e.target.value})} className="w-full border rounded p-2 text-sm mt-1"><option>Mr</option><option>Mme</option><option>Mlle</option></select> : <p className="font-bold text-navy-900">{lead.civility}</p>}
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Nom</label>
                                    {isEditing ? <input value={editedLead.lastName} onChange={e => setEditedLead({...editedLead, lastName: e.target.value})} className="w-full border rounded p-2 text-sm mt-1" /> : <p className="font-bold text-navy-900">{lead.lastName}</p>}
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Prénom</label>
                                    {isEditing ? <input value={editedLead.firstName} onChange={e => setEditedLead({...editedLead, firstName: e.target.value})} className="w-full border rounded p-2 text-sm mt-1" /> : <p className="font-bold text-navy-900">{lead.firstName}</p>}
                                </div>
                                <div className="col-span-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Adresse</label>
                                    {isEditing ? <input value={editedLead.address} onChange={e => setEditedLead({...editedLead, address: e.target.value})} className="w-full border rounded p-2 text-sm mt-1" /> : <p className="font-bold text-navy-900">{lead.address}</p>}
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">CP Ville</label>
                                    {isEditing ? <input value={editedLead.zipCity} onChange={e => setEditedLead({...editedLead, zipCity: e.target.value})} className="w-full border rounded p-2 text-sm mt-1" /> : <p className="font-bold text-navy-900">{lead.zipCity}</p>}
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Pays</label>
                                    {isEditing ? <input value={editedLead.country} onChange={e => setEditedLead({...editedLead, country: e.target.value})} className="w-full border rounded p-2 text-sm mt-1" /> : <p className="font-bold text-navy-900">{lead.country}</p>}
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Portable</label>
                                    {isEditing ? <input value={editedLead.phone} onChange={e => setEditedLead({...editedLead, phone: e.target.value})} className="w-full border rounded p-2 text-sm mt-1" /> : <p className="font-bold text-navy-900">{lead.phone}</p>}
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Email</label>
                                    {isEditing ? <input value={editedLead.email} onChange={e => setEditedLead({...editedLead, email: e.target.value})} className="w-full border rounded p-2 text-sm mt-1" /> : <p className="font-bold text-navy-900 truncate">{lead.email}</p>}
                                </div>
                            </div>
                            
                            {isEditing && (
                                <button onClick={handleSaveInfos} className="w-full mt-6 bg-navy-900 text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"><Save size={18}/> Enregistrer les modifications</button>
                            )}
                        </div>
                    </div>
                )}

                {/* 2. FICHE ENFANT */}
                {activeTab === 'enfants' && (
                    <div className="space-y-6">
                        {lead.children.map((child, idx) => (
                            <div key={child.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                                <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2"><GraduationCap className="text-gold-500" /> Dossier de {child.firstName}</h3>
                                
                                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                    <InfoField label="CLASSE" value={child.class} />
                                    <InfoField label="MATIÈRE(S)" value={child.subjects} />
                                    <InfoField label="MOYENNE" value={child.average} />
                                    <InfoField label="ÉTABLISSEMENT" value={child.school} />
                                    <InfoField label="ORIENTATION" value={child.orientation} />
                                    <InfoField label="PERSONNALITÉ" value={child.personality} />
                                    <InfoField label="LOISIRS" value={child.hobbies} />
                                    <InfoField label="DISPOS" value={child.availability} />
                                    <div className="col-span-2">
                                        <InfoField label="BESOINS & DIFFICULTÉS" value={child.needs} isFullWidth />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 font-bold hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2"><Plus size={20} /> Ajouter un enfant</button>
                    </div>
                )}

                {/* 3. CONTRATS / CONFIGURATEUR */}
                {activeTab === 'contrats' && (
                    <div className="space-y-6">
                        <div className="bg-navy-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl"></div>
                            <h3 className="text-xl font-bold font-serif mb-6 flex items-center gap-2"><PenTool className="text-gold-500" /> Nouveau Contrat</h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="text-[10px] font-bold text-navy-400 uppercase">Élève concerné</label>
                                    <select 
                                        value={contractConfig.childId} 
                                        onChange={e => setContractConfig({...contractConfig, childId: e.target.value})}
                                        className="w-full bg-navy-800 border-navy-700 text-white rounded-lg p-2.5 mt-1 outline-none text-sm"
                                    >
                                        {lead.children.map(c => <option key={c.id} value={c.id}>{c.firstName}</option>)}
                                    </select>
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-bold text-navy-400 uppercase">Niveau</label>
                                    <select 
                                        value={contractConfig.level} 
                                        onChange={e => setContractConfig({...contractConfig, level: e.target.value})}
                                        className="w-full bg-navy-800 border-navy-700 text-white rounded-lg p-2.5 mt-1 outline-none text-sm"
                                    >
                                        <option>Primaire</option><option>Collège</option><option>Lycée</option><option>Supérieur</option>
                                    </select>
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-bold text-navy-400 uppercase">Matière</label>
                                    <input value={contractConfig.subject} onChange={e => setContractConfig({...contractConfig, subject: e.target.value})} className="w-full bg-navy-800 border-navy-700 text-white rounded-lg p-2.5 mt-1 outline-none text-sm" />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-bold text-navy-400 uppercase">Durée Séance (h)</label>
                                    <input type="number" step="0.5" value={contractConfig.duration} onChange={e => setContractConfig({...contractConfig, duration: Number(e.target.value)})} className="w-full bg-navy-800 border-navy-700 text-white rounded-lg p-2.5 mt-1 outline-none text-sm" />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-bold text-navy-400 uppercase">Séances / Semaine</label>
                                    <input type="number" value={contractConfig.sessionsPerWeek} onChange={e => setContractConfig({...contractConfig, sessionsPerWeek: Number(e.target.value)})} className="w-full bg-navy-800 border-navy-700 text-white rounded-lg p-2.5 mt-1 outline-none text-sm" />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-bold text-navy-400 uppercase">Nb Semaines</label>
                                    <input type="number" value={contractConfig.weeks} onChange={e => setContractConfig({...contractConfig, weeks: Number(e.target.value)})} className="w-full bg-navy-800 border-navy-700 text-white rounded-lg p-2.5 mt-1 outline-none text-sm" />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-bold text-navy-400 uppercase">Tarif Horaire (€)</label>
                                    <input type="number" value={contractConfig.hourlyRate} onChange={e => setContractConfig({...contractConfig, hourlyRate: Number(e.target.value)})} className="w-full bg-navy-800 border-navy-700 text-white rounded-lg p-2.5 mt-1 outline-none text-sm" />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-bold text-navy-400 uppercase">Frais de Dossier (€)</label>
                                    <input type="number" value={contractConfig.fees} onChange={e => setContractConfig({...contractConfig, fees: Number(e.target.value)})} className="w-full bg-navy-800 border-navy-700 text-white rounded-lg p-2.5 mt-1 outline-none text-sm" />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-bold text-navy-400 uppercase">Avoir / Réduction (€)</label>
                                    <input type="number" value={contractConfig.discount} onChange={e => setContractConfig({...contractConfig, discount: Number(e.target.value)})} className="w-full bg-navy-800 border-navy-700 text-white rounded-lg p-2.5 mt-1 outline-none text-sm" />
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-navy-700 bg-navy-950/50 -mx-6 px-6 pb-6 rounded-b-2xl">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-navy-400 text-sm">Volume total : <b className="text-white">{totalHours}h</b></span>
                                    <div className="text-right">
                                        <p className="text-[10px] text-navy-400 uppercase font-bold">Total à facturer</p>
                                        <p className="text-3xl font-extrabold text-gold-500">{finalTotal.toLocaleString()} €</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleGenerateContract}
                                    className="w-full bg-gold-500 text-navy-900 py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-widest hover:bg-gold-600 transition-all shadow-xl shadow-gold-500/10 flex items-center justify-center gap-2"
                                >
                                    {showContractSuccess ? <CheckCircle className="animate-bounce" /> : <FileCheck size={20} />}
                                    {showContractSuccess ? 'Contrat Prêt !' : 'Générer le contrat PDF'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. TIMELINE SUIVI */}
                {activeTab === 'suivi' && (
                    <div className="space-y-6">
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                            <textarea 
                                value={note}
                                onChange={e => setNote(e.target.value)}
                                placeholder="Ajouter un commentaire au dossier..." 
                                className="w-full text-sm outline-none resize-none min-h-[100px] mb-2"
                            />
                            <div className="flex justify-end"><button onClick={handleAddNote} className="bg-navy-900 text-white px-4 py-2 rounded-lg text-xs font-bold">Publier</button></div>
                        </div>

                        <div className="relative pl-6 border-l-2 border-gray-100 space-y-8">
                            {lead.activities.map(a => (
                                <div key={a.id} className="relative">
                                    <div className={`absolute -left-[33px] p-1.5 rounded-full border-2 border-white shadow-sm ${a.type === 'contract' ? 'bg-gold-500 text-navy-900' : 'bg-gray-100 text-gray-500'}`}>
                                        {a.type === 'contract' ? <PenTool size={14} /> : <MessageSquare size={14} />}
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <div className="flex justify-between mb-1"><span className="text-[10px] font-bold text-gray-400">{a.date}</span><span className="text-[10px] font-bold bg-gray-50 px-2 rounded-full">{a.user}</span></div>
                                        <p className="text-sm text-navy-800">{a.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-white flex gap-3">
                <button onClick={onClose} className="flex-1 py-3 text-sm font-bold text-gray-400 hover:text-navy-900 transition-colors">Fermer</button>
            </div>
        </div>
    );
};

const InfoField = ({ label, value, isFullWidth = false }: { label: string, value?: string, isFullWidth?: boolean }) => (
    <div className={`mb-2 ${isFullWidth ? 'w-full' : ''}`}>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
        <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl text-sm font-bold text-navy-800 min-h-[40px] flex items-center">
            {value || <span className="text-gray-300 font-normal italic">Non renseigné</span>}
        </div>
    </div>
);

// Fix: Redefined DashboardView correctly and ensured only one declaration exists in the file scope.
const DashboardView = ({ leads }: { leads?: Family[] }) => {
    const activeLeads = leads || MOCK_FAMILIES;
    const reportsToValidate = 1; 
    const leadsToContact = activeLeads.filter(f => f.status === 'Nouveau' || f.status === 'Contact').length;
    const pendingMatching = MOCK_MISSIONS.filter(m => m.status === 'En recherche').length; 
    const currentMonth = new Date().toLocaleString('fr-FR', { month: 'long' });

    return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full overflow-y-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard icon={<FileCheck className="text-white" />} iconBg="bg-pink-500" title="Bilans à valider" value={reportsToValidate} subtext="Rapports en attente" />
            <StatCard icon={<Network className="text-white" />} iconBg="bg-orange-500" title="Matchings en attente" value={pendingMatching} subtext="Missions à pourvoir" />
            <StatCard icon={<Users className="text-white" />} iconBg="bg-violet-600" title="Familles Actives" value={activeLeads.filter(f => f.status === 'Gagné').length} subtext="En suivi" />
            <StatCard icon={<UserPlus className="text-white" />} iconBg="bg-blue-400" title="Candidats Profs" value={2} subtext="Dossiers reçus" />
            <StatCard icon={<GraduationCap className="text-white" />} iconBg="bg-blue-600" title="Profs Actifs" value={MOCK_TEACHERS.length} subtext="Disponibles" />
            <StatCard icon={<Target className="text-white" />} iconBg="bg-emerald-500" title="Pipeline Commercial" value={leadsToContact} subtext="Prospects en cours" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueCard title={`CA Mensuel (${currentMonth})`} signed={MOCK_FINANCIALS.month.signed} pipe={MOCK_FINANCIALS.month.pipe} objective={MOCK_FINANCIALS.month.objective} />
            <RevenueCard title={`CA Annuel (2025)`} signed={MOCK_FINANCIALS.year.signed} pipe={MOCK_FINANCIALS.year.pipe} objective={MOCK_FINANCIALS.year.objective} isYearly />
        </div>
    </div>
    );
};

// ... (Subcomponents)
const RecrutementView = () => (
    <div className="p-6 h-full overflow-y-auto">
        <h2 className="text-2xl font-bold font-serif text-navy-900 mb-6">Recrutement & RH</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr><th className="p-4 font-bold text-gray-600">Nom</th><th className="p-4 font-bold text-gray-600">Matières</th><th className="p-4 font-bold text-gray-600">Villes</th><th className="p-4 font-bold text-gray-600">Statut</th><th className="p-4 font-bold text-gray-600">Actions</th></tr>
                </thead>
                <tbody>
                    {MOCK_TEACHERS.map(teacher => (
                        <tr key={teacher.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4 font-bold text-navy-900">{teacher.name}</td><td className="p-4 text-gray-600">{teacher.subjects.join(', ')}</td><td className="p-4 text-gray-600">{teacher.cities.join(', ')}</td><td className="p-4"><StatusBadge status={teacher.status} /></td><td className="p-4"><button className="text-violet-600 font-bold text-sm">Voir Profil</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const MatchingView = () => (
    <div className="p-6 h-full overflow-y-auto">
        <h2 className="text-2xl font-bold font-serif text-navy-900 mb-6">Matching Élèves / Profs</h2>
        <div className="grid gap-4">
            {MOCK_MISSIONS.map(mission => (
                <div key={mission.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                    <div><h3 className="font-bold text-navy-900">{mission.familyName}</h3><p className="text-sm text-gray-600">{mission.subject} • {mission.level}</p></div>
                    <div className="flex items-center gap-4"><StatusBadge status={mission.status} />{mission.assignedTeacherId ? <span className="text-sm font-bold text-green-600">Assigné: {MOCK_TEACHERS.find(t => t.id === mission.assignedTeacherId)?.name}</span> : <button className="bg-navy-900 text-white px-4 py-2 rounded-lg text-sm font-bold">Trouver un prof</button>}</div>
                </div>
            ))}
        </div>
    </div>
);

const SuiviView = () => (
    <div className="p-6 h-full overflow-y-auto">
        <h2 className="text-2xl font-bold font-serif text-navy-900 mb-6">Suivi Pédagogique</h2>
        <div className="space-y-4">
            {MOCK_REPORTS.map(report => (
                <div key={report.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between mb-2"><span className="font-bold text-navy-900">{report.studentName}</span><span className="text-sm text-gray-500">{report.date}</span></div>
                    <p className="text-sm text-gray-600 mb-2">Prof: {report.teacherName}</p>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm text-navy-800 italic">"{report.content}"</div>
                    <div className="mt-2 flex justify-end"><StatusBadge status={report.status} /></div>
                </div>
            ))}
        </div>
    </div>
);

const StatCard = ({ icon, iconBg, title, value, subtext }: { icon: React.ReactNode, iconBg: string, title: string, value: number, subtext: string }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
        <div className={`p-3 rounded-xl ${iconBg} shadow-lg shadow-gray-200`}>{icon}</div>
        <div><p className="text-gray-500 text-sm font-medium">{title}</p><p className="text-2xl font-bold text-navy-900 mt-1">{value}</p><p className="text-xs text-gray-400 mt-1">{subtext}</p></div>
    </div>
);

const RevenueCard = ({ title, signed, pipe, objective, isYearly }: { title: string, signed: number, pipe: number, objective: number, isYearly?: boolean }) => {
    const signedPercent = Math.min((signed / objective) * 100, 100);
    const pipePercent = Math.min((pipe / objective) * 100, 100);
    const timeProgress = 75; // Mock progress for demo

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-navy-900 capitalize">{title}</h3>
                <div className="text-right"><p className="text-xs text-gray-400 uppercase tracking-wide">Objectif</p><p className="font-bold text-navy-900">{objective.toLocaleString()} €</p></div>
            </div>
            <div className="relative h-4 bg-gray-100 rounded-full mb-4 group">
                <div className={`absolute top-0 left-0 h-full rounded-l-full ${isYearly ? 'bg-blue-600' : 'bg-green-500'} transition-all duration-1000`} style={{ width: `${signedPercent}%` }}></div>
                <div className="absolute top-0 h-full bg-gold-400/50 transition-all duration-1000 border-l border-white" style={{ left: `${signedPercent}%`, width: `${pipePercent}%` }}></div>
                <div className="absolute -top-1 -bottom-1 w-0.5 border-l-2 border-dashed border-navy-900 z-20" style={{ left: `${timeProgress}%` }}></div>
            </div>
            <div className="flex justify-between text-sm">
                <div><span className={`inline-block w-2 h-2 rounded-full ${isYearly ? 'bg-blue-600' : 'bg-green-500'} mr-2`}></span><span className="text-gray-600 font-medium">Signé : {signed.toLocaleString()} €</span></div>
                <div><span className="inline-block w-2 h-2 rounded-full bg-gold-400 mr-2"></span><span className="text-gray-600 font-medium">Pipeline : {pipe.toLocaleString()} €</span></div>
            </div>
        </div>
    );
};

const StatusBadge = ({ status }: { status: string }) => {
    let colorClass = 'bg-gray-100 text-gray-600';
    switch (status) {
        case 'Gagné': case 'Validé': case 'Actif': colorClass = 'bg-green-100 text-green-700 border border-green-200'; break;
        case 'Nouveau': case 'Contact': colorClass = 'bg-blue-100 text-blue-700 border border-blue-200'; break;
        case 'Devis': case 'Proposition': colorClass = 'bg-yellow-100 text-yellow-700 border border-yellow-200'; break;
        case 'Contrat': colorClass = 'bg-purple-100 text-purple-700 border border-purple-200'; break;
        case 'En recherche': case 'En attente': case 'Candidat': colorClass = 'bg-orange-100 text-orange-700 border border-orange-200'; break;
        default: break;
    }
    return <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${colorClass}`}>{status}</span>;
};

// --- KANBAN VIEW ---
const ALL_KANBAN_COLUMNS: KanbanColumnDef[] = [
    { id: 'Nouveau', title: '🆕 Nouveau', color: 'bg-blue-50', borderColor: 'border-blue-500' },
    { id: 'Contact', title: '📞 Contact', color: 'bg-orange-50', borderColor: 'border-orange-500' },
    { id: 'Devis', title: '📝 Devis', color: 'bg-yellow-50', borderColor: 'border-yellow-400' },
    { id: 'Contrat', title: '📩 Contrat', color: 'bg-purple-50', borderColor: 'border-purple-500' },
    { id: 'Gagné', title: '✅ Actif', color: 'bg-green-50', borderColor: 'border-green-500' },
    { id: 'Archivé', title: '🗄️ Archivé', color: 'bg-gray-100', borderColor: 'border-gray-300' },
];

interface KanbanBoardViewProps { onLeadClick: (lead: Family) => void; leads: Family[]; setLeads: React.Dispatch<React.SetStateAction<Family[]>>; }

const KanbanBoardView: React.FC<KanbanBoardViewProps> = ({ onLeadClick, leads, setLeads }) => {
    const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
    const handleDragStart = (e: React.DragEvent, id: string) => { setDraggedLeadId(id); e.dataTransfer.effectAllowed = 'move'; };
    const handleDragOver = (e: React.DragEvent) => e.preventDefault();
    const handleDrop = (e: React.DragEvent, status: PipelineStatus) => {
        e.preventDefault();
        if (draggedLeadId) {
            setLeads(prev => prev.map(l => l.id === draggedLeadId ? { ...l, status } : l));
            setDraggedLeadId(null);
        }
    };

    return (
        <div className="h-full flex gap-4 overflow-x-auto pb-4 px-2 snap-x">
            {ALL_KANBAN_COLUMNS.map(column => {
                const columnLeads = leads.filter(l => l.status === column.id);
                return (
                    <div key={column.id} className={`min-w-[280px] w-[280px] flex flex-col rounded-xl bg-gray-50/50 border-t-4 ${column.borderColor} shadow-sm max-h-full`} onDragOver={handleDragOver} onDrop={e => handleDrop(e, column.id)}>
                        <div className="p-3 border-b border-gray-100 bg-white rounded-t-lg flex justify-between items-center"><h3 className="font-bold text-navy-900 text-sm">{column.title}</h3><span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 rounded-full">{columnLeads.length}</span></div>
                        <div className="p-2 flex-1 overflow-y-auto space-y-3">
                            {columnLeads.map(lead => (
                                <div key={lead.id} draggable onDragStart={e => handleDragStart(e, lead.id)} onClick={() => onLeadClick(lead)} className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${column.borderColor} cursor-grab active:cursor-grabbing hover:shadow-md transition-all`}>
                                    <h4 className="font-bold text-navy-900 text-sm">{lead.lastName} {lead.firstName}</h4>
                                    <p className="text-[10px] text-gray-400 mt-1">{lead.children.map(c => c.firstName).join(', ')}</p>
                                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-50">
                                        <span className="text-[10px] text-gray-400 font-bold">{lead.city}</span>
                                        <span className="text-xs font-bold text-green-600">{lead.potentialValue} €</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const SettingsView = () => {
    const [prices] = useState(MOCK_PRICING);
    const [salaries] = useState(MOCK_SALARIES);
    return (
        <div className="p-6 h-full overflow-y-auto space-y-8">
            <div className="grid grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold font-serif text-navy-900 mb-6 flex items-center gap-2"><Euro className="text-violet-600" /> Facturation Famille</h3>
                    <div className="space-y-3">{prices.map(p => <div key={p.id} className="flex justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 font-bold text-navy-900"><span>{p.level}</span><span>{p.basePrice} €/h</span></div>)}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold font-serif text-navy-900 mb-6 flex items-center gap-2"><Briefcase className="text-blue-600" /> Salaires Professeurs</h3>
                    <div className="space-y-3">{salaries.map(s => <div key={s.id} className="flex justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 font-bold text-navy-900 text-sm"><span>{s.qualification}</span><span>{s.hourlyWageBrut} €/h</span></div>)}</div>
                </div>
            </div>
        </div>
    );
};

export default CrmDashboard;
