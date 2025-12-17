
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, GraduationCap, Network, FileCheck, Lock, 
  Search, CheckCircle, Clock, AlertCircle, TrendingUp, DollarSign,
  PlusCircle, UserCheck, Calendar, Briefcase, ChevronRight, LogOut,
  Phone, Mail, Target, ArrowRight, BatteryWarning, UserPlus, FileText,
  MapPin, MoreHorizontal, FileText as FileIcon, X, PenTool, Euro,
  PhoneOutgoing, History, Save, Send, RefreshCw
} from 'lucide-react';
import { MOCK_FAMILIES, MOCK_TEACHERS, MOCK_MISSIONS, MOCK_REPORTS, MOCK_FINANCIALS } from '../../data/mockCrmData';
import { Family, Teacher, PipelineStatus, Activity } from '../../types';

interface CrmDashboardProps {
    onLogout: () => void;
}

type CrmTab = 'dashboard' | 'commercial' | 'recrutement' | 'matching' | 'suivi' | 'admin';
type FamilyFilter = 'all' | 'prospects' | 'active' | 'archived';

const AVERAGE_BASKET = 600; // Panier moyen par défaut pour les prospects

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
    <div className="min-h-screen bg-gray-50 flex font-sans overflow-hidden">
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
            <SidebarItem icon={<Users size={20}/>} label="Familles" active={activeTab === 'commercial'} onClick={() => setActiveTab('commercial')} />
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
      <main className="flex-1 ml-64 p-8 h-screen overflow-y-auto bg-gray-100 flex flex-col">
         {/* Global Header & Search */}
         <div className="flex justify-between items-center mb-6 relative shrink-0">
             <h1 className="text-3xl font-bold text-navy-900 font-serif capitalize tracking-tight">
                 {activeTab === 'dashboard' ? 'Tableau de Bord' : 
                  activeTab === 'commercial' ? 'Gestion Familles' : 
                  activeTab.replace('-', ' ')}
             </h1>
             
             <div className="flex items-center gap-6 relative z-30">
                 {/* Smart Search Bar */}
                 <div className="relative group">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold-500 transition-colors" size={18} />
                     <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher (Nom, Tél...)" 
                        className="pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-transparent w-80 bg-white shadow-sm transition-all" 
                     />
                     
                     {/* Search Results Dropdown */}
                     {searchResults && (
                         <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                             <div className="p-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wide">
                                 Résultats
                             </div>
                             <div className="max-h-80 overflow-y-auto">
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
         <div className="flex-1 overflow-hidden relative">
             {activeTab === 'dashboard' && <DashboardView />}
             {activeTab === 'commercial' && <KanbanBoardView />}
             {activeTab === 'recrutement' && <div className="overflow-y-auto h-full"><RecrutementView /></div>}
             {activeTab === 'matching' && <div className="overflow-y-auto h-full"><MatchingView /></div>}
             {activeTab === 'suivi' && <div className="overflow-y-auto h-full"><SuiviView /></div>}
         </div>

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

// --- KANBAN VIEW (Commercial Replacement) ---

interface KanbanColumnDef {
    id: PipelineStatus;
    title: string;
    color: string;
    borderColor: string;
}

const ALL_KANBAN_COLUMNS: KanbanColumnDef[] = [
    { id: 'Nouveau', title: '🆕 Nouveau lead', color: 'bg-blue-50', borderColor: 'border-blue-500' },
    { id: 'Contact', title: '📞 Prise de contact', color: 'bg-orange-50', borderColor: 'border-orange-500' },
    { id: 'Devis', title: '📝 Devis envoyé', color: 'bg-yellow-50', borderColor: 'border-yellow-400' },
    { id: 'Contrat', title: '📩 Contrat envoyé', color: 'bg-purple-50', borderColor: 'border-purple-500' },
    { id: 'Gagné', title: '✅ Famille active', color: 'bg-green-50', borderColor: 'border-green-500' },
    { id: 'À reconduire', title: '🔄 À reconduire', color: 'bg-pink-50', borderColor: 'border-pink-500' },
    { id: 'Perdu', title: '❌ Perdu', color: 'bg-gray-200', borderColor: 'border-gray-500' },
    { id: 'Archivé', title: '🗄️ Archivé', color: 'bg-gray-100', borderColor: 'border-gray-300' },
];

const KanbanBoardView = () => {
    const [leads, setLeads] = useState<Family[]>(MOCK_FAMILIES);
    const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
    const [selectedLead, setSelectedLead] = useState<Family | null>(null);
    const [familyFilter, setFamilyFilter] = useState<FamilyFilter>('all');
    
    // Lost Modal Logic
    const [isLostModalOpen, setIsLostModalOpen] = useState(false);
    const [pendingLostLeadId, setPendingLostLeadId] = useState<string | null>(null);
    const [lostReason, setLostReason] = useState('');

    // Filtered Columns Logic
    const getColumns = () => {
        switch(familyFilter) {
            case 'prospects': 
                return ALL_KANBAN_COLUMNS.filter(c => ['Nouveau', 'Contact', 'Devis', 'Contrat'].includes(c.id));
            case 'active':
                return ALL_KANBAN_COLUMNS.filter(c => ['Gagné', 'À reconduire'].includes(c.id));
            case 'archived':
                return ALL_KANBAN_COLUMNS.filter(c => ['Perdu', 'Archivé'].includes(c.id));
            default:
                return ALL_KANBAN_COLUMNS;
        }
    };

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedLeadId(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); 
    };

    const handleDrop = (e: React.DragEvent, status: PipelineStatus) => {
        e.preventDefault();
        if (draggedLeadId) {
            // Smart Drop Logic
            if (status === 'Perdu') {
                setPendingLostLeadId(draggedLeadId);
                setIsLostModalOpen(true);
                return;
            }

            if (status === 'Gagné') {
               // Could trigger a "Success" animation or Client Form here
               // For now just update
            }

            updateLeadStatus(draggedLeadId, status);
            setDraggedLeadId(null);
        }
    };

    const updateLeadStatus = (id: string, status: PipelineStatus, reason?: string) => {
        setLeads(prev => prev.map(lead => {
            if (lead.id === id) {
                const newActivities: Activity[] = [
                    { 
                        id: Date.now().toString(), 
                        type: 'status_change', 
                        content: `Déplacé vers ${status}${reason ? `: ${reason}` : ''}`, 
                        date: new Date().toISOString().split('T')[0], 
                        user: 'Vous' 
                    },
                    ...lead.activities
                ];
                return { ...lead, status: status, activities: newActivities };
            }
            return lead;
        }));
    };

    const confirmLost = () => {
        if (pendingLostLeadId) {
            updateLeadStatus(pendingLostLeadId, 'Perdu', lostReason);
            setIsLostModalOpen(false);
            setPendingLostLeadId(null);
            setLostReason('');
        }
    };

    return (
        <div className="h-full flex flex-col relative">
             {/* Sub-Tabs / Filters */}
             <div className="flex gap-4 mb-4 pb-2 border-b border-gray-200">
                <button 
                    onClick={() => setFamilyFilter('all')}
                    className={`text-sm font-bold px-3 pb-2 transition-colors border-b-2 ${familyFilter === 'all' ? 'text-navy-900 border-navy-900' : 'text-gray-400 border-transparent hover:text-navy-700'}`}
                >
                    Toutes les familles
                </button>
                <button 
                    onClick={() => setFamilyFilter('prospects')}
                    className={`text-sm font-bold px-3 pb-2 transition-colors border-b-2 ${familyFilter === 'prospects' ? 'text-navy-900 border-navy-900' : 'text-gray-400 border-transparent hover:text-navy-700'}`}
                >
                    Leads et prospects
                </button>
                <button 
                    onClick={() => setFamilyFilter('active')}
                    className={`text-sm font-bold px-3 pb-2 transition-colors border-b-2 ${familyFilter === 'active' ? 'text-navy-900 border-navy-900' : 'text-gray-400 border-transparent hover:text-navy-700'}`}
                >
                    Familles actives
                </button>
                <button 
                    onClick={() => setFamilyFilter('archived')}
                    className={`text-sm font-bold px-3 pb-2 transition-colors border-b-2 ${familyFilter === 'archived' ? 'text-navy-900 border-navy-900' : 'text-gray-400 border-transparent hover:text-navy-700'}`}
                >
                    Perdu et archivés
                </button>
             </div>

            <div className="flex gap-4 overflow-x-auto h-full pb-4 px-2 snap-x">
                {getColumns().map(column => {
                    const columnLeads = leads.filter(l => l.status === column.id);
                    // Value Calculation Logic based on Status
                    const totalValue = columnLeads.reduce((sum, lead) => {
                        if (lead.status === 'Nouveau' || lead.status === 'Contact') return sum + AVERAGE_BASKET;
                        return sum + (lead.potentialValue || 0);
                    }, 0);

                    return (
                    <div 
                        key={column.id}
                        className={`min-w-[300px] w-[300px] flex flex-col rounded-xl bg-gray-50/50 border-t-4 ${column.borderColor} shadow-sm max-h-full`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, column.id)}
                    >
                        {/* Header */}
                        <div className="p-3 border-b border-gray-100 bg-white rounded-t-lg">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-bold text-navy-900 text-sm flex items-center gap-2">
                                    {column.title}
                                </h3>
                                <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-0.5 rounded-full">
                                    {columnLeads.length}
                                </span>
                            </div>
                            {totalValue > 0 && (
                                <div className="text-right">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                                        {column.id === 'Gagné' ? 'Montant Signé' : 'Potentiel'}
                                    </span>
                                    <p className={`text-xs font-bold ${column.id === 'Gagné' ? 'text-navy-900' : 'text-green-600'}`}>
                                        {totalValue.toLocaleString('fr-FR')} €
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Cards Container */}
                        <div className="p-2 flex-1 overflow-y-auto space-y-3">
                            {columnLeads.map(lead => (
                                <KanbanCard 
                                    key={lead.id} 
                                    lead={lead} 
                                    onClick={() => setSelectedLead(lead)}
                                    onDragStart={(e) => handleDragStart(e, lead.id)}
                                    borderColor={column.borderColor}
                                    isLost={column.id === 'Perdu'}
                                />
                            ))}
                        </div>
                    </div>
                )})}
            </div>

            {/* Slide Over Panel */}
            {selectedLead && (
                <LeadDetailPanel 
                    lead={selectedLead} 
                    onClose={() => setSelectedLead(null)} 
                    onUpdate={(updatedLead) => setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l))}
                />
            )}

            {/* Lost Reason Modal */}
            {isLostModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl animate-in zoom-in-95">
                        <h3 className="text-lg font-bold text-navy-900 mb-4">Pourquoi ce lead est-il perdu ?</h3>
                        <div className="space-y-2 mb-6">
                            {['Trop cher', 'A choisi un concurrent', 'Pas intéressé', 'Plus de nouvelles', 'Autre'].map(r => (
                                <label key={r} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                                    <input 
                                        type="radio" 
                                        name="reason" 
                                        value={r} 
                                        checked={lostReason === r}
                                        onChange={(e) => setLostReason(e.target.value)}
                                        className="text-navy-900 focus:ring-navy-900"
                                    />
                                    <span className="text-sm text-gray-700">{r}</span>
                                </label>
                            ))}
                        </div>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setIsLostModalOpen(false)} className="px-4 py-2 text-gray-500 font-bold hover:text-navy-900">Annuler</button>
                            <button onClick={confirmLost} className="px-4 py-2 bg-navy-900 text-white rounded-lg font-bold hover:bg-navy-800" disabled={!lostReason}>Confirmer</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const KanbanCard = ({ lead, onClick, onDragStart, borderColor, isLost }: { 
    lead: Family, 
    onClick: () => void, 
    onDragStart: (e: React.DragEvent) => void,
    borderColor: string,
    isLost: boolean
}) => {
    // Calculate Urgency
    const daysSinceLastContact = Math.floor((new Date().getTime() - new Date(lead.lastContact).getTime()) / (1000 * 3600 * 24));
    let urgencyColor = 'bg-green-500';
    let urgencyTitle = 'Actif';
    
    if (daysSinceLastContact > 5) {
        urgencyColor = 'bg-red-500 animate-pulse';
        urgencyTitle = 'Urgent (> 5j)';
    } else if (daysSinceLastContact > 2) {
        urgencyColor = 'bg-orange-500';
        urgencyTitle = 'À traiter';
    }

    if (lead.status === 'Gagné' || lead.status === 'Archivé' || lead.status === 'Perdu') {
        urgencyColor = 'bg-gray-300'; // No urgency for closed states
    }
    
    // Value Logic for Card Display
    const getValueDisplay = () => {
        if (lead.status === 'Nouveau' || lead.status === 'Contact') {
            return { label: 'Est.', amount: AVERAGE_BASKET, color: 'text-gray-400' };
        }
        if (lead.status === 'À reconduire') {
            return { label: 'Renouv.', amount: lead.potentialValue, color: 'text-pink-600' };
        }
        if (lead.status === 'Gagné') {
             return { label: 'Signé', amount: lead.potentialValue, color: 'text-navy-900' };
        }
        return { label: 'Devis', amount: lead.potentialValue, color: 'text-green-600' };
    };

    const valueInfo = getValueDisplay();

    return (
        <div 
            draggable 
            onDragStart={onDragStart}
            onClick={onClick}
            className={`
                bg-white p-4 rounded-lg shadow-sm border-l-4 ${borderColor} 
                cursor-grab active:cursor-grabbing hover:shadow-md transition-all 
                relative group ${isLost ? 'opacity-60 grayscale' : ''}
            `}
        >
            {/* Header: Name + Urgency */}
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-navy-900 text-sm truncate max-w-[200px]">{lead.name}</h4>
                <div className={`w-2.5 h-2.5 rounded-full ${urgencyColor}`} title={urgencyTitle}></div>
            </div>

            {/* Tags (Subjects) */}
            <div className="flex flex-wrap gap-1 mb-3">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-violet-50 text-violet-700 border border-violet-100">
                    {lead.children[0]?.split('(')[1]?.replace(')', '') || 'Scolaire'}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                    {lead.subjectNeeds?.split(' ')[0] || 'Général'}
                </span>
            </div>
            
            {/* Footer: Date + Value */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Clock size={10} />
                    <span>{new Date(lead.lastContact).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short'})}</span>
                </div>
                {valueInfo.amount > 0 && (
                    <div className={`flex items-center gap-1 text-xs font-bold ${valueInfo.color}`}>
                        <span className="text-[9px] uppercase font-normal text-gray-400 mr-0.5">{valueInfo.label}</span>
                        <Euro size={10} />
                        <span>{valueInfo.amount}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- SLIDE OVER DETAIL PANEL ---

const LeadDetailPanel = ({ lead, onClose, onUpdate }: { lead: Family, onClose: () => void, onUpdate: (l: Family) => void }) => {
    const [activeTab, setActiveTab] = useState<'infos' | 'suivi' | 'documents'>('infos');
    const [note, setNote] = useState('');
    
    // Quote Generator State
    const [quoteRate, setQuoteRate] = useState(25);
    const [quoteHours, setQuoteHours] = useState(10);
    const [showQuoteSuccess, setShowQuoteSuccess] = useState(false);

    const handleAddNote = () => {
        if (!note.trim()) return;
        const newActivity: Activity = {
            id: Date.now().toString(),
            type: 'note',
            content: note,
            date: new Date().toISOString().split('T')[0],
            user: 'Vous'
        };
        const updatedLead = { ...lead, activities: [newActivity, ...lead.activities], lastContact: new Date().toISOString().split('T')[0] };
        onUpdate(updatedLead);
        setNote('');
    };

    const handleGenerateQuote = () => {
        const amount = quoteRate * quoteHours;
        const newActivity: Activity = {
            id: Date.now().toString(),
            type: 'quote',
            content: `Devis généré : ${quoteHours}h à ${quoteRate}€/h = ${amount}€`,
            date: new Date().toISOString().split('T')[0],
            user: 'Vous'
        };
        const updatedLead: Family = { ...lead, activities: [newActivity, ...lead.activities], potentialValue: amount, status: 'Devis' as PipelineStatus };
        onUpdate(updatedLead);
        setShowQuoteSuccess(true);
        setTimeout(() => setShowQuoteSuccess(false), 3000);
    };

    return (
        <div className="absolute inset-y-0 right-0 w-[500px] bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-navy-900 text-white flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-serif font-bold">{lead.name}</h2>
                    <p className="text-navy-300 text-sm mt-1 flex items-center gap-2">
                        <MapPin size={14} /> {lead.city} • <span className="text-gold-400 font-bold">{lead.status}</span>
                    </p>
                </div>
                <button onClick={onClose} className="text-navy-400 hover:text-white transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button onClick={() => setActiveTab('infos')} className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === 'infos' ? 'border-navy-900 text-navy-900' : 'border-transparent text-gray-400 hover:text-navy-700'}`}>Infos</button>
                <button onClick={() => setActiveTab('suivi')} className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === 'suivi' ? 'border-navy-900 text-navy-900' : 'border-transparent text-gray-400 hover:text-navy-700'}`}>Suivi & Timeline</button>
                <button onClick={() => setActiveTab('documents')} className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === 'documents' ? 'border-navy-900 text-navy-900' : 'border-transparent text-gray-400 hover:text-navy-700'}`}>Devis Express</button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                {activeTab === 'infos' && (
                    <div className="space-y-6">
                        {/* Actions Rapides */}
                        <div className="grid grid-cols-2 gap-4">
                            <a href={`tel:${lead.phone.replace(/ /g, '')}`} className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-green-500/20 transition-all">
                                <Phone size={18} /> Appeler
                            </a>
                            <a href={`mailto:${lead.email}`} className="bg-white border border-gray-200 hover:border-navy-900 text-navy-900 p-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all">
                                <Mail size={18} /> Email
                            </a>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                                <UserCheck size={14} /> Coordonnées
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-400">Téléphone</p>
                                    <p className="font-bold text-navy-900 text-lg">{lead.phone}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Email</p>
                                    <p className="font-bold text-navy-900">{lead.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Ville</p>
                                    <p className="font-bold text-navy-900">{lead.city}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                                <Target size={14} /> Besoin Pédagogique
                            </h3>
                            <div className="space-y-2">
                                <div className="flex justify-between border-b border-gray-50 pb-2">
                                    <span className="text-gray-600 text-sm">Élève(s)</span>
                                    <span className="font-bold text-navy-900">{lead.children.join(', ')}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-50 pb-2">
                                    <span className="text-gray-600 text-sm">Matière</span>
                                    <span className="font-bold text-navy-900">{lead.subjectNeeds}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-sm">Source</span>
                                    <span className="font-bold text-violet-600">{lead.source || 'Non renseigné'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'suivi' && (
                    <div className="space-y-6">
                        {/* Note Taker */}
                        <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                            <textarea 
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Ajouter une note au dossier..." 
                                className="w-full text-sm resize-none outline-none text-navy-900 placeholder:text-gray-400" 
                                rows={3}
                            ></textarea>
                            <div className="flex justify-end mt-2">
                                <button onClick={handleAddNote} className="bg-navy-900 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-navy-800 transition-colors">
                                    <Save size={14} /> Enregistrer
                                </button>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="relative pl-6 border-l-2 border-gray-200 space-y-8">
                            {lead.activities.map((activity) => (
                                <div key={activity.id} className="relative group">
                                    <div className={`
                                        absolute -left-[33px] p-1.5 rounded-full border-2 border-white shadow-sm
                                        ${activity.type === 'call' ? 'bg-green-100 text-green-600' : 
                                          activity.type === 'quote' ? 'bg-gold-100 text-gold-600' :
                                          activity.type === 'status_change' ? 'bg-blue-100 text-blue-600' :
                                          'bg-gray-100 text-gray-500'}
                                    `}>
                                        {activity.type === 'call' && <PhoneOutgoing size={14} />}
                                        {activity.type === 'quote' && <FileIcon size={14} />}
                                        {activity.type === 'status_change' && <ArrowRight size={14} />}
                                        {(activity.type === 'note' || activity.type === 'meeting') && <FileText size={14} />}
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-xs font-bold text-gray-400 uppercase">{activity.date}</span>
                                            <span className="text-[10px] font-bold bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full">{activity.user}</span>
                                        </div>
                                        <p className="text-sm text-navy-900 leading-relaxed font-medium">
                                            {activity.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Start Point */}
                            <div className="relative">
                                <div className="absolute -left-[29px] w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></div>
                                <p className="text-xs text-gray-400 italic">Création du lead</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'documents' && (
                    <div className="space-y-6">
                        {/* Quote Generator */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
                                <PenTool size={18} className="text-gold-500" /> Générateur Express
                            </h3>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase">Tarif Horaire (€)</label>
                                    <input 
                                        type="number" 
                                        value={quoteRate}
                                        onChange={(e) => setQuoteRate(Number(e.target.value))}
                                        className="w-full mt-1 p-2 border border-gray-200 rounded-lg font-bold text-navy-900" 
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase">Volume (Heures)</label>
                                    <input 
                                        type="number" 
                                        value={quoteHours}
                                        onChange={(e) => setQuoteHours(Number(e.target.value))}
                                        className="w-full mt-1 p-2 border border-gray-200 rounded-lg font-bold text-navy-900" 
                                    />
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg mb-6 flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">Total Devis</span>
                                <span className="text-xl font-extrabold text-navy-900">{(quoteRate * quoteHours).toLocaleString()} €</span>
                            </div>

                            <button 
                                onClick={handleGenerateQuote}
                                className="w-full bg-navy-900 hover:bg-navy-800 text-white py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                {showQuoteSuccess ? <CheckCircle className="animate-bounce" /> : <FileCheck />}
                                {showQuoteSuccess ? 'Devis Créé !' : 'Générer le PDF'}
                            </button>
                        </div>

                         {/* Existing Docs */}
                        <div>
                             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Documents existants</h4>
                             {lead.activities.filter(a => a.type === 'quote').length === 0 && (
                                 <p className="text-sm text-gray-400 italic">Aucun document pour le moment.</p>
                             )}
                             {lead.activities.filter(a => a.type === 'quote').map(doc => (
                                <div key={doc.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between mb-2 hover:border-violet-200 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-red-50 text-red-600 p-2 rounded-lg"><FileIcon size={20} /></div>
                                        <div>
                                            <p className="font-bold text-sm text-navy-900 truncate max-w-[180px]">{doc.content}</p>
                                            <p className="text-xs text-gray-500">{doc.date}</p>
                                        </div>
                                    </div>
                                    <button className="text-navy-400 hover:text-navy-900"><MoreHorizontal size={20}/></button>
                                </div>
                             ))}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-200 bg-white flex gap-3">
                 {lead.status !== 'Gagné' && (
                    <button onClick={() => { updateLeadStatus(lead.id, 'Gagné'); onClose(); }} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-colors shadow-lg">
                        Conclure (Gagné)
                    </button>
                 )}
                 <button className="flex-1 bg-navy-900 hover:bg-navy-800 text-white py-3 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2">
                    Action Suivante <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
    
    // Helper to update lead status from within the panel (mock implementation wrapper)
    function updateLeadStatus(id: string, status: PipelineStatus) {
         const newActivity: Activity = {
            id: Date.now().toString(),
            type: 'status_change',
            content: `Déplacé vers ${status} depuis le panneau`,
            date: new Date().toISOString().split('T')[0],
            user: 'Vous'
        };
        const updatedLead = { ...lead, status: status, activities: [newActivity, ...lead.activities] };
        onUpdate(updatedLead);
    }
};

// --- EXISTING DASHBOARD VIEW (Unchanged mainly, just rendering) ---

const DashboardView = () => {
    // Generate derived tasks based on mock data
    const leadsToContact = MOCK_FAMILIES.filter(f => f.status === 'Nouveau' || f.status === 'Contact').length;
    const renewalNeeded = MOCK_FAMILIES.filter(f => f.status === 'Gagné' && f.remainingHours < 4).length;
    const pendingMatching = MOCK_MISSIONS.filter(m => m.status === 'En recherche').length;
    const candidates = MOCK_TEACHERS.filter(t => t.status === 'Candidat').length;
    
    return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full overflow-y-auto pb-20">
        
        {/* KPI Section - Row 1: Humans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                icon={<Users className="text-white" />} 
                iconBg="bg-violet-600"
                title="Familles Actives" 
                value={MOCK_FAMILIES.filter(f => f.status === 'Gagné').length} 
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
                {MOCK_FAMILIES.filter(f => f.status === 'Nouveau').map(f => (
                    <TaskItem 
                        key={'lead-'+f.id}
                        type="lead"
                        title={`Nouveau Lead : ${f.name}`}
                        subtitle={`Reçu le ${f.lastContact} • ${f.city}`}
                        actionLabel="Traiter"
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
                {MOCK_FAMILIES.filter(f => f.status === 'Gagné' && f.remainingHours < 4).map(f => (
                        <TaskItem 
                        key={'renew-'+f.id}
                        type="renew"
                        title={`Renouvellement : ${f.name}`}
                        subtitle={`Reste ${f.remainingHours}h • ${f.children[0]}`}
                        actionLabel="Relancer"
                    />
                ))}

                {/* Candidates */}
                 {MOCK_TEACHERS.filter(t => t.status === 'Candidat').map(t => (
                    <TaskItem 
                        key={'candidat-'+t.id}
                        type="candidate"
                        title={`Candidat : ${t.name}`}
                        subtitle={`${t.subjects[0]} • ${t.cities[0]}`}
                        actionLabel="Auditer"
                    />
                ))}
            </div>
        </div>
    </div>
    );
};

// --- Custom Components for Dashboard ---

const StatCard = ({ icon, iconBg, title, value, subtext }: any) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:-translate-y-1">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg shadow-gray-200 ${iconBg}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">{title}</p>
                <p className="text-2xl font-extrabold text-navy-900">{value}</p>
                <p className="text-xs text-gray-500 font-medium">{subtext}</p>
            </div>
        </div>
    );
};

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

// --- STANDARD VIEWS (Recrutement, Matching, Suivi - Keeping standard layout) ---

const RecrutementView = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden m-1">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 m-1">
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
    <div className="space-y-6 m-1">
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

const StatusBadge = ({ status }: { status: string }) => {
    let styles = "bg-gray-100 text-gray-600";
    switch (status) {
        case 'Client': case 'Actif': case 'Validée': case 'Validé': case 'Gagné': styles = "bg-green-100 text-green-700 border border-green-200"; break;
        case 'Lead': case 'En recherche': case 'Proposition': case 'Nouveau': styles = "bg-blue-100 text-blue-700 border border-blue-200"; break;
        case 'Candidat': case 'En attente': case 'Contact': styles = "bg-orange-100 text-orange-700 border border-orange-200"; break;
        case 'Ancien': case 'Inactif': case 'Perdu': styles = "bg-gray-100 text-gray-500 border border-gray-200"; break;
        case 'Devis': styles = "bg-yellow-100 text-yellow-700 border border-yellow-200"; break;
        case 'Contrat': styles = "bg-purple-100 text-purple-700 border border-purple-200"; break;
        case 'À reconduire': styles = "bg-pink-100 text-pink-700 border border-pink-200"; break;
    }
    return <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles}`}>{status}</span>;
};

export default CrmDashboard;
