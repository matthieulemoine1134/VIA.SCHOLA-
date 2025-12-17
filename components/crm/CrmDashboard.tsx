
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, GraduationCap, Network, FileCheck, Lock, 
  Search, CheckCircle, Clock, AlertCircle, TrendingUp, DollarSign,
  PlusCircle, UserCheck, Calendar, Briefcase, ChevronRight, LogOut,
  Phone, Mail, Target, ArrowRight, BatteryWarning, UserPlus, FileText,
  MapPin, MoreHorizontal, FileText as FileIcon, X, PenTool, Euro,
  PhoneOutgoing, History, Save, Send, RefreshCw, MessageSquare, Edit, Trash, Plus,
  User, Settings, FileBox, Calculator, Download
} from 'lucide-react';
import { 
    MOCK_FAMILIES, MOCK_TEACHERS, MOCK_MISSIONS, MOCK_REPORTS, MOCK_FINANCIALS,
    MOCK_PRICING, MOCK_ZONES, MOCK_SALARIES, MOCK_DOCUMENTS 
} from '../../data/mockCrmData';
import { Family, Teacher, PipelineStatus, Activity, PricingRule, GeographicZone, SalaryRule, DocumentTemplate } from '../../types';

interface CrmDashboardProps {
    onLogout: () => void;
    initialLeads?: Family[];
}

type CrmTab = 'dashboard' | 'commercial' | 'recrutement' | 'matching' | 'suivi' | 'admin' | 'settings';
type FamilyFilter = 'all' | 'prospects' | 'active' | 'archived';

const AVERAGE_BASKET = 600; // Panier moyen par défaut pour les prospects

const CrmDashboard: React.FC<CrmDashboardProps> = ({ onLogout, initialLeads }) => {
  const [activeTab, setActiveTab] = useState<CrmTab>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Selection State (Global for Search & Kanban)
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);

  // Use props leads or fallback to mock
  const [leads, setLeads] = useState<Family[]>(initialLeads || MOCK_FAMILIES);

  // Sync leads if initialLeads changes (e.g. new lead added from public site)
  useEffect(() => {
    if (initialLeads) {
        setLeads(initialLeads);
    }
  }, [initialLeads]);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{families: Family[], teachers: Teacher[]} | null>(null);

  // Search Logic (updated to use live 'leads' instead of MOCK_FAMILIES)
  useEffect(() => {
    if (searchQuery.length > 2) {
      const lowerQ = searchQuery.toLowerCase();
      const families = leads.filter(f => 
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
  }, [searchQuery, leads]);

  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (password === 'admin') {
          setIsAuthenticated(true);
      } else {
          alert('Mot de passe incorrect (Indice: admin)');
      }
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

        <div className="p-4 border-t border-navy-800 bg-navy-950 space-y-2">
             <SidebarItem icon={<Settings size={20}/>} label="Paramètres" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
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
                  activeTab === 'settings' ? 'Paramètres & Configuration' :
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
                                             <div key={f.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0" onClick={() => handleSearchResultClick(f)}>
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
             {activeTab === 'dashboard' && <DashboardView leads={leads} />}
             {activeTab === 'commercial' && <KanbanBoardView leads={leads} setLeads={setLeads} onLeadClick={setSelectedFamily} />}
             {activeTab === 'recrutement' && <div className="overflow-y-auto h-full"><RecrutementView /></div>}
             {activeTab === 'matching' && <div className="overflow-y-auto h-full"><MatchingView /></div>}
             {activeTab === 'suivi' && <div className="overflow-y-auto h-full"><SuiviView /></div>}
             {activeTab === 'settings' && <div className="overflow-y-auto h-full"><SettingsView /></div>}
         </div>

         {/* Global Lead Detail Panel (Overlay) */}
         {selectedFamily && (
            <LeadDetailPanel 
                lead={selectedFamily} 
                onClose={() => setSelectedFamily(null)} 
                onUpdate={(updatedLead) => {
                    // Update the local state
                    setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
                    // Update selected family to show changes immediately
                    setSelectedFamily(updatedLead);
                }}
            />
         )}

      </main>
    </div>
  );
};

// ... (Existing SidebarItem, LeadDetailPanel, KanbanBoardView components...)
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

// --- NEW SETTINGS VIEW ---
const SettingsView = () => {
    // State for inputs (initialized with Mocks)
    const [prices, setPrices] = useState<PricingRule[]>(MOCK_PRICING);
    const [zones, setZones] = useState<GeographicZone[]>(MOCK_ZONES);
    const [salaries, setSalaries] = useState<SalaryRule[]>(MOCK_SALARIES);
    const [documents, setDocuments] = useState<DocumentTemplate[]>(MOCK_DOCUMENTS);
    const [mileageAllowance, setMileageAllowance] = useState(0.40); // 40cts/km

    // State for Margin Calculator
    const [selectedLevel, setSelectedLevel] = useState(prices[1].level); // Collège default
    const [selectedQualif, setSelectedQualif] = useState(salaries[0].qualification); // Bac+3 default
    const [selectedZone, setSelectedZone] = useState(zones[0].name);

    // Helpers to update state
    const updatePrice = (id: string, newVal: number) => {
        setPrices(prev => prev.map(p => p.id === id ? { ...p, basePrice: newVal } : p));
    };

    const updateSalary = (id: string, field: 'hourlyWageBrut' | 'hourlyWageNet', newVal: number) => {
        setSalaries(prev => prev.map(s => s.id === id ? { ...s, [field]: newVal } : s));
    };

    // Calculate Margin for Simulator
    const currentPriceObj = prices.find(p => p.level === selectedLevel) || prices[0];
    const currentZoneObj = zones.find(z => z.name === selectedZone) || zones[0];
    const currentSalaryObj = salaries.find(s => s.qualification === selectedQualif) || salaries[0];

    const totalPrice = currentPriceObj.basePrice + currentZoneObj.supplement;
    // Coût employeur estimé (Brut * 1.45 pour charges patronales approx)
    const employerCost = currentSalaryObj.hourlyWageBrut * 1.45; 
    const margin = totalPrice - employerCost;
    const marginPercent = ((margin / totalPrice) * 100).toFixed(1);

    return (
        <div className="p-6 pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1. FACTURATION FAMILLE */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-xl font-bold font-serif text-navy-900 mb-6 flex items-center gap-2">
                        <Euro className="text-violet-600" /> Facturation Famille
                    </h3>

                    {/* Base Prices */}
                    <div className="mb-6">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Prix de vente (Horaire)</h4>
                        <div className="space-y-3">
                            {prices.map(price => (
                                <div key={price.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <span className="font-bold text-navy-900">{price.level}</span>
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="number" 
                                            value={price.basePrice} 
                                            onChange={(e) => updatePrice(price.id, Number(e.target.value))}
                                            className="w-20 p-1 text-right font-bold text-navy-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
                                        />
                                        <span className="text-sm text-gray-500">€/h</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Zones */}
                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Suppléments Géographiques</h4>
                        <div className="space-y-3">
                            {zones.map(zone => (
                                <div key={zone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <span className="font-medium text-navy-700">{zone.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-400 font-bold">+</span>
                                        <input 
                                            type="number" 
                                            defaultValue={zone.supplement} 
                                            className="w-16 p-1 text-right font-bold text-navy-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
                                        />
                                        <span className="text-sm text-gray-500">€</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. RÉMUNÉRATION ENSEIGNANTS */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-xl font-bold font-serif text-navy-900 mb-6 flex items-center gap-2">
                        <Briefcase className="text-blue-600" /> Salaires Enseignants
                    </h3>

                    <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-12 gap-2 text-xs font-bold text-gray-400 uppercase tracking-wide px-2">
                            <div className="col-span-6">Niveau</div>
                            <div className="col-span-3 text-right">Brut/h</div>
                            <div className="col-span-3 text-right">Net/h (Est.)</div>
                        </div>
                        {salaries.map(salary => (
                            <div key={salary.id} className="grid grid-cols-12 gap-2 items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="col-span-6 font-bold text-navy-900 text-sm">{salary.qualification}</div>
                                <div className="col-span-3 flex justify-end">
                                    <input 
                                        type="number" 
                                        value={salary.hourlyWageBrut} 
                                        onChange={(e) => updateSalary(salary.id, 'hourlyWageBrut', Number(e.target.value))}
                                        className="w-16 p-1 text-right font-bold text-navy-900 bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="col-span-3 flex justify-end">
                                     <input 
                                        type="number" 
                                        value={salary.hourlyWageNet} 
                                        onChange={(e) => updateSalary(salary.id, 'hourlyWageNet', Number(e.target.value))}
                                        className="w-16 p-1 text-right font-bold text-green-600 bg-white border border-gray-200 rounded-lg outline-none focus:border-green-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center border border-blue-100">
                        <div>
                            <p className="font-bold text-navy-900 text-sm">Indemnités Kilométriques</p>
                            <p className="text-xs text-blue-600">Barème URSSAF 2024</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                type="number" 
                                step="0.01"
                                value={mileageAllowance} 
                                onChange={(e) => setMileageAllowance(Number(e.target.value))}
                                className="w-20 p-2 text-right font-bold text-navy-900 bg-white border border-blue-200 rounded-lg outline-none"
                            />
                            <span className="font-bold text-navy-700">€/km</span>
                        </div>
                    </div>
                </div>

                {/* 3. SIMULATEUR DE MARGE */}
                <div className="bg-navy-900 text-white rounded-2xl shadow-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 opacity-10 rounded-full blur-[60px] pointer-events-none"></div>
                    
                    <h3 className="text-xl font-bold font-serif mb-6 flex items-center gap-2 relative z-10">
                        <Calculator className="text-gold-500" /> Analyse de Rentabilité
                    </h3>

                    <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
                        <div>
                            <label className="text-xs text-navy-300 uppercase font-bold block mb-1">Niveau</label>
                            <select 
                                value={selectedLevel} 
                                onChange={(e) => setSelectedLevel(e.target.value)}
                                className="w-full bg-navy-800 border border-navy-700 text-white rounded-lg p-2 text-sm outline-none"
                            >
                                {prices.map(p => <option key={p.id} value={p.level}>{p.level}</option>)}
                            </select>
                        </div>
                        <div>
                             <label className="text-xs text-navy-300 uppercase font-bold block mb-1">Zone</label>
                            <select 
                                value={selectedZone} 
                                onChange={(e) => setSelectedZone(e.target.value)}
                                className="w-full bg-navy-800 border border-navy-700 text-white rounded-lg p-2 text-sm outline-none"
                            >
                                {zones.map(z => <option key={z.id} value={z.name}>{z.name}</option>)}
                            </select>
                        </div>
                        <div>
                             <label className="text-xs text-navy-300 uppercase font-bold block mb-1">Professeur</label>
                            <select 
                                value={selectedQualif} 
                                onChange={(e) => setSelectedQualif(e.target.value)}
                                className="w-full bg-navy-800 border border-navy-700 text-white rounded-lg p-2 text-sm outline-none"
                            >
                                {salaries.map(s => <option key={s.id} value={s.qualification}>{s.qualification}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="bg-navy-800/50 rounded-xl p-4 border border-navy-700 space-y-3 relative z-10">
                        <div className="flex justify-between text-sm">
                            <span className="text-navy-200">Facturation Client</span>
                            <span className="font-bold text-white">{totalPrice.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-navy-200">Coût Salarial Chargé (x1.45)</span>
                            <span className="font-bold text-red-300">- {employerCost.toFixed(2)} €</span>
                        </div>
                        <div className="h-px bg-navy-700 my-2"></div>
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-gold-500">Marge Brute</span>
                            <div className="text-right">
                                <span className="block text-2xl font-bold text-white">{margin.toFixed(2)} €</span>
                                <span className={`text-xs font-bold ${Number(marginPercent) > 30 ? 'text-green-400' : 'text-orange-400'}`}>
                                    {marginPercent}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. DOCUMENTS BRUTS */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-xl font-bold font-serif text-navy-900 mb-6 flex items-center gap-2">
                        <FileBox className="text-orange-500" /> Documents & Modèles
                    </h3>
                    
                    <div className="space-y-3">
                        {documents.map(doc => (
                            <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-orange-200 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-lg border border-gray-200 text-gray-500">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-navy-900 group-hover:text-orange-600 transition-colors">{doc.name}</p>
                                        <p className="text-xs text-gray-500">{doc.type} • Mis à jour le {doc.lastUpdated}</p>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-navy-900 p-2">
                                    <Download size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <button className="w-full mt-6 border border-dashed border-gray-300 text-gray-500 rounded-xl py-3 text-sm font-bold hover:bg-gray-50 hover:text-navy-900 hover:border-navy-300 transition-all flex items-center justify-center gap-2">
                        <Plus size={16} /> Ajouter un nouveau modèle
                    </button>
                </div>
            </div>
        </div>
    );
};

// ... (Rest of existing KanbanCard, KanbanCardProps, LeadDetailPanel...)

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

interface KanbanBoardViewProps {
    onLeadClick: (lead: Family) => void;
    leads: Family[];
    setLeads: React.Dispatch<React.SetStateAction<Family[]>>;
}

const KanbanBoardView: React.FC<KanbanBoardViewProps> = ({ onLeadClick, leads, setLeads }) => {
    // We use the passed leads state instead of local mock initialization
    // const [leads, setLeads] = useState<Family[]>(MOCK_FAMILIES); <--- Removed
    
    const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
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
                                    onClick={() => onLeadClick(lead)}
                                    onDragStart={(e) => handleDragStart(e, lead.id)}
                                    borderColor={column.borderColor}
                                    isLost={column.id === 'Perdu'}
                                />
                            ))}
                        </div>
                    </div>
                )})}
            </div>

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

interface KanbanCardProps {
    lead: Family;
    onClick: () => void;
    onDragStart: (e: React.DragEvent) => void;
    borderColor: string;
    isLost: boolean;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ lead, onClick, onDragStart, borderColor, isLost }) => {
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

// --- SLIDE OVER DETAIL PANEL (ENRICHED) ---

const LeadDetailPanel = ({ lead, onClose, onUpdate }: { lead: Family, onClose: () => void, onUpdate: (l: Family) => void }) => {
    const [activeTab, setActiveTab] = useState<'infos' | 'suivi' | 'documents'>('infos');
    const [isEditing, setIsEditing] = useState(false);
    const [note, setNote] = useState('');
    
    // Retrieve linked missions (Contracts)
    const familyMissions = MOCK_MISSIONS.filter(m => m.familyId === lead.id);

    // Edit Form State
    const [editedLead, setEditedLead] = useState<Family>(lead);
    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentClass, setNewStudentClass] = useState('');

    // Quote Generator State
    const [quoteRate, setQuoteRate] = useState(25);
    const [quoteHours, setQuoteHours] = useState(10);
    const [showQuoteSuccess, setShowQuoteSuccess] = useState(false);
    const [showActionSuccess, setShowActionSuccess] = useState<string | null>(null);

    // Helper to update lead status
    const updateLeadStatus = (id: string, status: PipelineStatus) => {
        const newActivity: Activity = {
           id: Date.now().toString(),
           type: 'status_change',
           content: `Déplacé vers ${status} depuis le panneau`,
           date: new Date().toISOString().split('T')[0],
           user: 'Vous'
       };
       const updatedLead = { ...lead, status: status, activities: [newActivity, ...lead.activities] };
       onUpdate(updatedLead);
   };

    // Call Action: No Answer
    const handleNoAnswer = () => {
        const newActivity: Activity = {
            id: Date.now().toString(),
            type: 'call',
            content: "Tentative d'appel (Pas de réponse). SMS et Mail de relance envoyés automatiquement.",
            date: new Date().toISOString().split('T')[0],
            user: 'Vous'
        };
        const updatedLead = { 
            ...lead, 
            status: 'Contact' as PipelineStatus, // Moves to Contact if it was Nouveau
            lastContact: new Date().toISOString().split('T')[0],
            activities: [newActivity, ...lead.activities] 
        };
        onUpdate(updatedLead);
        setShowActionSuccess("Appel logué & SMS envoyé !");
        setTimeout(() => setShowActionSuccess(null), 3000);
    };

    // Call Action: Answered -> Go to Edit Mode
    const handleAnswered = () => {
        setIsEditing(true);
        setActiveTab('infos');
    };

    const handleSaveDiscovery = () => {
        // Save the edited info
        const newActivity: Activity = {
            id: Date.now().toString(),
            type: 'status_change',
            content: "Découverte des besoins effectuée (Fiche mise à jour).",
            date: new Date().toISOString().split('T')[0],
            user: 'Vous'
        };
        const finalLead = { 
            ...editedLead, 
            status: 'Devis' as PipelineStatus, // Move to Devis stage logic implies we know what they want
            lastContact: new Date().toISOString().split('T')[0],
            activities: [newActivity, ...editedLead.activities] 
        };
        onUpdate(finalLead);
        setIsEditing(false);
        setActiveTab('documents'); // Auto switch to Quote generation
    };

    const handleAddStudent = () => {
        if (newStudentName && newStudentClass) {
            setEditedLead(prev => ({
                ...prev,
                children: [...prev.children, `${newStudentName} (${newStudentClass})`]
            }));
            setNewStudentName('');
            setNewStudentClass('');
        }
    };

    const handleRemoveStudent = (index: number) => {
        setEditedLead(prev => ({
            ...prev,
            children: prev.children.filter((_, i) => i !== index)
        }));
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
        <div className="absolute inset-y-0 right-0 w-[600px] bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header with Call Actions */}
            <div className="bg-navy-900 text-white p-6 pb-4">
                <div className="flex justify-between items-start mb-4">
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

                {/* Call Center Actions */}
                {lead.status !== 'Gagné' && lead.status !== 'Perdu' && !isEditing && (
                    <div className="bg-navy-800 p-3 rounded-xl border border-navy-700 flex gap-3">
                         <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-wider px-2">
                             <Phone size={14} /> Appel
                         </div>
                         <button 
                            onClick={handleNoAnswer}
                            className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
                         >
                            <PhoneOutgoing size={14} /> Pas de réponse
                         </button>
                         <button 
                            onClick={handleAnswered}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                         >
                            <CheckCircle size={14} /> A décroché
                         </button>
                    </div>
                )}
                
                {/* Notification Toast inside header */}
                {showActionSuccess && (
                    <div className="mt-3 bg-green-500/20 border border-green-500/30 text-green-300 text-sm py-2 px-3 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                        <CheckCircle size={14} /> {showActionSuccess}
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 bg-white">
                <button onClick={() => setActiveTab('infos')} className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === 'infos' ? 'border-navy-900 text-navy-900' : 'border-transparent text-gray-400 hover:text-navy-700'}`}>
                   {isEditing ? 'Mode Découverte ✏️' : 'Infos Famille'}
                </button>
                <button onClick={() => setActiveTab('suivi')} className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === 'suivi' ? 'border-navy-900 text-navy-900' : 'border-transparent text-gray-400 hover:text-navy-700'}`}>
                    Suivi
                </button>
                <button onClick={() => setActiveTab('documents')} className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === 'documents' ? 'border-navy-900 text-navy-900' : 'border-transparent text-gray-400 hover:text-navy-700'}`}>
                    Devis & Contrats
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                {activeTab === 'infos' && (
                    <div className="space-y-6">
                        
                        {/* VIEW MODE */}
                        {!isEditing && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <a href={`tel:${lead.phone.replace(/ /g, '')}`} className="bg-white border border-gray-200 hover:border-green-500 hover:text-green-600 text-gray-700 p-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all">
                                        <Phone size={18} /> Appeler
                                    </a>
                                    <a href={`mailto:${lead.email}`} className="bg-white border border-gray-200 hover:border-navy-900 text-navy-900 p-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all">
                                        <Mail size={18} /> Email
                                    </a>
                                </div>

                                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative group">
                                    <button onClick={() => setIsEditing(true)} className="absolute top-4 right-4 text-gray-300 hover:text-navy-900">
                                        <Edit size={16} />
                                    </button>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                                        <UserCheck size={14} /> Coordonnées
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-gray-400">Nom complet</p>
                                                <p className="font-bold text-navy-900">{lead.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Ville</p>
                                                <p className="font-bold text-navy-900">{lead.city}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-gray-400">Téléphone</p>
                                                <p className="font-bold text-navy-900">{lead.phone}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Email</p>
                                                <p className="font-bold text-navy-900 truncate">{lead.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                                        <GraduationCap size={14} /> Élèves & Besoins
                                    </h3>
                                    <div className="space-y-3">
                                        {lead.children.map((child, idx) => (
                                            <div key={idx} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-bold">
                                                        {child.charAt(0)}
                                                    </div>
                                                    <span className="font-bold text-navy-900">{child}</span>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="pt-2">
                                            <p className="text-xs text-gray-400 uppercase mb-1">Matières / Besoin</p>
                                            <p className="text-sm text-navy-700 bg-gray-50 p-2 rounded-lg">{lead.subjectNeeds}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* MISSIONS / CONTRACTS / TEACHERS SECTION */}
                                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                                            <Briefcase size={14} /> Contrats & Intervenants
                                        </h3>
                                        {familyMissions.length > 0 && <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{familyMissions.length} actif(s)</span>}
                                    </div>
                                    
                                    {familyMissions.length === 0 ? (
                                        <p className="text-sm text-gray-400 italic">Aucune mission en cours pour le moment.</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {familyMissions.map(mission => {
                                                const assignedTeacher = MOCK_TEACHERS.find(t => t.id === mission.assignedTeacherId);
                                                return (
                                                    <div key={mission.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <span className="font-bold text-navy-900 text-sm">{mission.subject}</span>
                                                                <span className="text-xs text-gray-500 ml-2">({mission.level})</span>
                                                            </div>
                                                            <StatusBadge status={mission.status} />
                                                        </div>
                                                        
                                                        {assignedTeacher ? (
                                                            <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-200">
                                                                <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                                                                    {assignedTeacher.name.charAt(0)}
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-400 font-bold uppercase">Professeur Assigné</p>
                                                                    <p className="text-sm font-bold text-navy-900">{assignedTeacher.name}</p>
                                                                </div>
                                                                <button className="ml-auto text-violet-600 hover:text-violet-800 text-xs font-bold">Voir</button>
                                                            </div>
                                                        ) : (
                                                            <div className="mt-2 text-xs text-orange-500 font-bold flex items-center gap-1">
                                                                <User size={12} /> Recherche intervenant en cours...
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* EDIT / DISCOVERY MODE */}
                        {isEditing && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 space-y-5">
                                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 items-start">
                                    <MessageSquare className="text-blue-500 shrink-0 mt-1" size={18} />
                                    <div>
                                        <p className="text-blue-800 font-bold text-sm">En ligne avec la famille</p>
                                        <p className="text-blue-600 text-xs mt-1">Posez les questions de découverte : Classe de l'élève ? Difficultés principales ? Disponibilités ?</p>
                                    </div>
                                </div>

                                {/* Contact Edit */}
                                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Infos Parents</h3>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs text-gray-500">Nom</label>
                                                <input type="text" value={editedLead.name} onChange={e => setEditedLead({...editedLead, name: e.target.value})} className="w-full border rounded p-2 text-sm font-bold text-navy-900" />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500">Ville</label>
                                                <input type="text" value={editedLead.city} onChange={e => setEditedLead({...editedLead, city: e.target.value})} className="w-full border rounded p-2 text-sm text-navy-900" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs text-gray-500">Tél</label>
                                                <input type="text" value={editedLead.phone} onChange={e => setEditedLead({...editedLead, phone: e.target.value})} className="w-full border rounded p-2 text-sm text-navy-900" />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500">Email</label>
                                                <input type="text" value={editedLead.email} onChange={e => setEditedLead({...editedLead, email: e.target.value})} className="w-full border rounded p-2 text-sm text-navy-900" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Students Edit */}
                                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Élèves</h3>
                                    
                                    <div className="space-y-2 mb-4">
                                        {editedLead.children.map((child, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                                                <span className="text-sm font-bold text-navy-900">{child}</span>
                                                <button onClick={() => handleRemoveStudent(idx)} className="text-red-400 hover:text-red-600"><Trash size={14}/></button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-2 items-end border-t border-gray-100 pt-3">
                                        <div className="flex-1">
                                            <label className="text-xs text-gray-400">Prénom</label>
                                            <input 
                                                type="text" 
                                                placeholder="Ex: Lucas" 
                                                value={newStudentName}
                                                onChange={(e) => setNewStudentName(e.target.value)}
                                                className="w-full border rounded p-2 text-sm" 
                                            />
                                        </div>
                                        <div className="w-1/3">
                                            <label className="text-xs text-gray-400">Classe</label>
                                            <select 
                                                value={newStudentClass}
                                                onChange={(e) => setNewStudentClass(e.target.value)}
                                                className="w-full border rounded p-2 text-sm"
                                            >
                                                <option value="">-</option>
                                                <option value="Primaire">Primaire</option>
                                                <option value="6ème">6ème</option>
                                                <option value="5ème">5ème</option>
                                                <option value="4ème">4ème</option>
                                                <option value="3ème">3ème</option>
                                                <option value="2nde">2nde</option>
                                                <option value="1ère">1ère</option>
                                                <option value="Term">Term</option>
                                            </select>
                                        </div>
                                        <button 
                                            onClick={handleAddStudent}
                                            disabled={!newStudentName || !newStudentClass}
                                            className="bg-navy-100 text-navy-700 p-2 rounded hover:bg-navy-200 disabled:opacity-50"
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Needs Edit */}
                                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Besoins & Matières</h3>
                                    <textarea 
                                        value={editedLead.subjectNeeds || ''}
                                        onChange={(e) => setEditedLead({...editedLead, subjectNeeds: e.target.value})}
                                        className="w-full border rounded p-3 text-sm h-24 resize-none focus:ring-2 focus:ring-violet-500 outline-none"
                                        placeholder="Ex: Besoin urgent en Maths pour le Bac. Disponible le mercredi aprem..."
                                    ></textarea>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button onClick={() => setIsEditing(false)} className="flex-1 py-3 border border-gray-300 rounded-xl font-bold text-gray-500 hover:bg-gray-50">
                                        Annuler
                                    </button>
                                    <button onClick={handleSaveDiscovery} className="flex-1 py-3 bg-navy-900 text-white rounded-xl font-bold hover:bg-navy-800 shadow-lg">
                                        Valider la Découverte
                                    </button>
                                </div>
                            </div>
                        )}
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
                            
                            <div className="mb-4 text-sm text-gray-600">
                                Pour <span className="font-bold text-navy-900">{lead.children.join(', ')}</span><br/>
                                <span className="italic">{lead.subjectNeeds}</span>
                            </div>

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
            {!isEditing && (
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
            )}
        </div>
    );
};

const DashboardView = ({ leads }: { leads?: Family[] }) => {
    // Generate derived tasks based on real-time leads + static mock data for others
    // We use the passed `leads` for lead calculations, fallback to mock for others if needed.
    const activeLeads = leads || MOCK_FAMILIES;

    const reportsToValidate = MOCK_REPORTS.filter(r => r.status === 'En attente').length; 
    const leadsToContact = activeLeads.filter(f => f.status === 'Nouveau' || f.status === 'Contact').length; // Total pipeline active processing
    const renewalNeeded = activeLeads.filter(f => f.status === 'Gagné' && f.remainingHours < 4).length;
    const pendingMatching = MOCK_MISSIONS.filter(m => m.status === 'En recherche').length; 
    const candidates = MOCK_TEACHERS.filter(t => t.status === 'Candidat').length;
    
    // Dynamic Date
    const currentMonth = new Date().toLocaleString('fr-FR', { month: 'long' });
    const currentYear = new Date().getFullYear();

    return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full overflow-y-auto pb-20">
        
        {/* KPI Section - Operational Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* 1. Bilans à valider (Pédagogique) */}
            <StatCard 
                icon={<FileCheck className="text-white" />} 
                iconBg="bg-pink-500"
                title="Bilans à valider" 
                value={reportsToValidate} 
                subtext="Rapports en attente"
            />
            
            {/* 2. Matchings en attente (Opérationnel) */}
             <StatCard 
                icon={<Network className="text-white" />} 
                iconBg="bg-orange-500"
                title="Matchings en attente" 
                value={pendingMatching} 
                subtext="Missions à pourvoir"
            />

            {/* 3. Familles Actives (Portefeuille) */}
            <StatCard 
                icon={<Users className="text-white" />} 
                iconBg="bg-violet-600"
                title="Familles Actives" 
                value={activeLeads.filter(f => f.status === 'Gagné').length} 
                subtext="En suivi"
            />

            {/* 4. Candidats (RH) */}
             <StatCard 
                icon={<UserPlus className="text-white" />} 
                iconBg="bg-blue-400"
                title="Candidats Profs" 
                value={candidates} 
                subtext="Dossiers reçus"
            />

            {/* 5. Profs Actifs (RH) */}
            <StatCard 
                icon={<GraduationCap className="text-white" />} 
                iconBg="bg-blue-600"
                title="Profs Actifs" 
                value={MOCK_TEACHERS.filter(t => t.status === 'Actif').length} 
                subtext="Disponibles"
            />

             {/* 6. Total Pipeline (Commercial) */}
            <StatCard 
                icon={<Target className="text-white" />} 
                iconBg="bg-emerald-500"
                title="Pipeline Commercial" 
                value={leadsToContact} 
                subtext="Prospects en cours"
            />
        </div>

        {/* KPI Section - Row 2: Financials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueCard 
                title={`CA Mensuel (${currentMonth})`}
                signed={MOCK_FINANCIALS.month.signed}
                pipe={MOCK_FINANCIALS.month.pipe}
                objective={MOCK_FINANCIALS.month.objective}
            />
             <RevenueCard 
                title={`CA Annuel (${currentYear})`}
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
                {activeLeads.filter(f => f.status === 'Nouveau').map(f => (
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
                {activeLeads.filter(f => f.status === 'Gagné' && f.remainingHours < 4).map(f => (
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

// ... (Rest of existing subcomponents remain unchanged)
const RecrutementView = () => (
    <div className="p-6">
        <h2 className="text-2xl font-bold font-serif text-navy-900 mb-6">Recrutement & RH</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="p-4 font-bold text-gray-600">Nom</th>
                        <th className="p-4 font-bold text-gray-600">Matières</th>
                        <th className="p-4 font-bold text-gray-600">Villes</th>
                        <th className="p-4 font-bold text-gray-600">Statut</th>
                        <th className="p-4 font-bold text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_TEACHERS.map(teacher => (
                        <tr key={teacher.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4 font-bold text-navy-900">{teacher.name}</td>
                            <td className="p-4 text-gray-600">{teacher.subjects.join(', ')}</td>
                            <td className="p-4 text-gray-600">{teacher.cities.join(', ')}</td>
                            <td className="p-4"><StatusBadge status={teacher.status} /></td>
                            <td className="p-4">
                                <button className="text-violet-600 hover:text-violet-800 font-bold text-sm">Voir Profil</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const MatchingView = () => (
    <div className="p-6">
        <h2 className="text-2xl font-bold font-serif text-navy-900 mb-6">Matching Élèves / Profs</h2>
        <div className="grid gap-4">
            {MOCK_MISSIONS.map(mission => (
                <div key={mission.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-navy-900">{mission.familyName}</h3>
                        <p className="text-sm text-gray-600">{mission.subject} • {mission.level}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <StatusBadge status={mission.status} />
                        {mission.assignedTeacherId ? (
                             <span className="text-sm font-bold text-green-600">Assigné: {MOCK_TEACHERS.find(t => t.id === mission.assignedTeacherId)?.name}</span>
                        ) : (
                             <button className="bg-navy-900 text-white px-4 py-2 rounded-lg text-sm font-bold">Trouver un prof</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const SuiviView = () => (
    <div className="p-6">
        <h2 className="text-2xl font-bold font-serif text-navy-900 mb-6">Suivi Pédagogique</h2>
        <div className="space-y-4">
            {MOCK_REPORTS.map(report => (
                <div key={report.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between mb-2">
                        <span className="font-bold text-navy-900">{report.studentName}</span>
                        <span className="text-sm text-gray-500">{report.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Prof: {report.teacherName}</p>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm text-navy-800 italic">"{report.content}"</div>
                    <div className="mt-2 flex justify-end">
                        <StatusBadge status={report.status} />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const StatCard = ({ icon, iconBg, title, value, subtext }: { icon: React.ReactNode, iconBg: string, title: string, value: number, subtext: string }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
        <div className={`p-3 rounded-xl ${iconBg} shadow-lg shadow-gray-200`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-navy-900 mt-1">{value}</p>
            <p className="text-xs text-gray-400 mt-1">{subtext}</p>
        </div>
    </div>
);

const RevenueCard = ({ title, signed, pipe, objective, isYearly }: { title: string, signed: number, pipe: number, objective: number, isYearly?: boolean }) => {
    const signedPercent = Math.min((signed / objective) * 100, 100);
    const pipePercent = Math.min((pipe / objective) * 100, 100);

    // Calculate temporal progress
    const now = new Date();
    let timeProgress = 0;
    
    if (isYearly) {
        const start = new Date(now.getFullYear(), 0, 1);
        const dayOfYear = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        timeProgress = (dayOfYear / 365) * 100;
    } else {
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        timeProgress = (now.getDate() / daysInMonth) * 100;
    }

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-navy-900 capitalize">{title}</h3>
                <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Objectif</p>
                    <p className="font-bold text-navy-900">{objective.toLocaleString()} €</p>
                </div>
            </div>

            <div className="relative h-4 bg-gray-100 rounded-full overflow-visible mb-4 group">
                {/* Signed Bar */}
                <div 
                    className={`absolute top-0 left-0 h-full rounded-l-full ${isYearly ? 'bg-blue-600' : 'bg-green-500'} transition-all duration-1000`} 
                    style={{ width: `${signedPercent}%` }}
                ></div>
                {/* Pipe Bar */}
                <div 
                    className="absolute top-0 h-full bg-gold-400/50 transition-all duration-1000 border-l border-white" 
                    style={{ left: `${signedPercent}%`, width: `${pipePercent}%` }}
                ></div>
                
                {/* Temporal Progress Marker */}
                <div 
                    className="absolute -top-1 -bottom-1 w-0.5 border-l-2 border-dashed border-navy-900 z-20 flex flex-col items-center transition-all duration-1000"
                    style={{ left: `${timeProgress}%` }}
                >
                    <div className="absolute -top-6 bg-navy-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap opacity-100">
                        Aujourd'hui
                    </div>
                </div>
            </div>

            <div className="flex justify-between text-sm">
                <div>
                    <span className={`inline-block w-2 h-2 rounded-full ${isYearly ? 'bg-blue-600' : 'bg-green-500'} mr-2`}></span>
                    <span className="text-gray-600 font-medium">Signé : {signed.toLocaleString()} €</span>
                </div>
                <div>
                    <span className="inline-block w-2 h-2 rounded-full bg-gold-400 mr-2"></span>
                    <span className="text-gray-600 font-medium">Pipeline : {pipe.toLocaleString()} €</span>
                </div>
            </div>
        </div>
    );
};

const StatusBadge = ({ status }: { status: string }) => {
    let colorClass = 'bg-gray-100 text-gray-600';

    switch (status) {
        // Pipeline / Family Status
        case 'Gagné':
        case 'Validé':
        case 'Validée':
        case 'Actif':
            colorClass = 'bg-green-100 text-green-700 border border-green-200';
            break;
        case 'Nouveau':
        case 'Contact':
            colorClass = 'bg-blue-100 text-blue-700 border border-blue-200';
            break;
        case 'Devis':
        case 'Proposition':
            colorClass = 'bg-yellow-100 text-yellow-700 border border-yellow-200';
            break;
        case 'Contrat':
            colorClass = 'bg-purple-100 text-purple-700 border border-purple-200';
            break;
        case 'À reconduire':
            colorClass = 'bg-pink-100 text-pink-700 border border-pink-200';
            break;
        case 'Perdu':
        case 'Inactif':
        case 'Archivé':
            colorClass = 'bg-gray-100 text-gray-500 border border-gray-200';
            break;
        case 'En recherche':
        case 'En attente':
        case 'Candidat':
            colorClass = 'bg-orange-100 text-orange-700 border border-orange-200';
            break;
        default:
            break;
    }

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${colorClass}`}>
            {status}
        </span>
    );
};

const TaskItem = ({ type, title, subtitle, actionLabel }: { type: 'lead' | 'match' | 'renew' | 'candidate', title: string, subtitle: string, actionLabel: string }) => {
    let icon = <UserPlus size={18} />;
    let colorClass = 'bg-blue-500';

    if (type === 'lead') {
        icon = <UserPlus size={18} />;
        colorClass = 'bg-blue-500';
    } else if (type === 'match') {
        icon = <Network size={18} />;
        colorClass = 'bg-orange-500';
    } else if (type === 'renew') {
        icon = <RefreshCw size={18} />;
        colorClass = 'bg-pink-500';
    } else if (type === 'candidate') {
        icon = <GraduationCap size={18} />;
        colorClass = 'bg-violet-500';
    }

    return (
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm ${colorClass}`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-bold text-navy-900 text-sm truncate">{title}</p>
                <p className="text-xs text-gray-500 truncate">{subtitle}</p>
            </div>
            <button className="text-xs font-bold text-navy-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg group-hover:bg-navy-900 group-hover:text-white transition-colors">
                {actionLabel}
            </button>
        </div>
    );
};

export default CrmDashboard;
