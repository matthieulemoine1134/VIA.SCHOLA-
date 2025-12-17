
import { Family, Teacher, Mission, Report, FinancialStats, PricingRule, GeographicZone, SalaryRule, DocumentTemplate } from '../types';

export const MOCK_FAMILIES: Family[] = [
  { 
    id: '1', 
    name: 'Famille Dupont', 
    email: 'dupont@email.com', 
    phone: '06 12 34 56 78', 
    city: 'Narbonne', 
    status: 'Gagné', 
    children: ['Léa (3ème)'], 
    subjectNeeds: 'Maths & Physique',
    lastContact: '2023-10-25', 
    remainingHours: 12,
    source: 'Site Web',
    potentialValue: 1200,
    activities: [
      { id: 'a1', type: 'status_change', content: 'Passé en Gagné', date: '2023-10-05', user: 'Matthieu' },
      { id: 'a2', type: 'call', content: 'Bilan effectué, très positif.', date: '2023-10-01', user: 'Matthieu' }
    ]
  },
  { 
    id: '2', 
    name: 'Famille Martin', 
    email: 'martin@email.com', 
    phone: '06 98 76 54 32', 
    city: 'Sigean', 
    status: 'Nouveau', 
    children: ['Lucas (Terminale)'], 
    subjectNeeds: 'Grand Oral',
    lastContact: new Date().toISOString().split('T')[0], // Aujourd'hui
    remainingHours: 0,
    source: 'Recommandation',
    potentialValue: 0, // Sera calculé par défaut (panier moyen)
    activities: [
      { id: 'a3', type: 'status_change', content: 'Lead créé depuis le site', date: new Date().toISOString().split('T')[0], user: 'Système' }
    ]
  },
  { 
    id: '3', 
    name: 'Famille Bernard', 
    email: 'bernard@email.com', 
    phone: '06 11 22 33 44', 
    city: 'Gruissan', 
    status: 'Contact', 
    children: ['Emma (1ère)'], 
    subjectNeeds: 'Français',
    lastContact: '2023-10-15', // > 5 jours -> Urgence Rouge
    remainingHours: 0,
    source: 'Google Maps',
    potentialValue: 0, // Sera calculé par défaut
    activities: [
      { id: 'a4', type: 'call', content: 'Message vocal laissé.', date: '2023-10-15', user: 'Matthieu' }
    ]
  }, 
  { 
    id: '4', 
    name: 'Famille Petit', 
    email: 'petit@email.com', 
    phone: '06 55 44 33 22', 
    city: 'Narbonne', 
    status: 'Archivé', 
    children: ['Hugo (Bac+1)'], 
    subjectNeeds: 'Anglais',
    lastContact: '2023-06-15', 
    remainingHours: 0,
    source: 'Site Web',
    potentialValue: 500,
    activities: []
  },
  { 
    id: '5', 
    name: 'Famille Garcia', 
    email: 'garcia@email.com', 
    phone: '06 77 88 99 00', 
    city: 'Coursan', 
    status: 'Devis', 
    children: ['Sofia (Seconde)'], 
    subjectNeeds: 'Aide aux devoirs',
    lastContact: '2023-10-22', 
    remainingHours: 0,
    source: 'Flyer Boulangerie',
    potentialValue: 1500,
    activities: [
      { id: 'a5', type: 'quote', content: 'Devis #2023-156 envoyé (30h)', date: '2023-10-22', user: 'Matthieu' },
      { id: 'a6', type: 'meeting', content: 'RDV Bilan à domicile', date: '2023-10-20', user: 'Matthieu' }
    ]
  },
  { 
    id: '6', 
    name: 'Famille Rousseau', 
    email: 'rousseau@email.com', 
    phone: '06 00 11 22 33', 
    city: 'Vinassan', 
    status: 'Contrat', 
    children: ['Arthur (4ème)'], 
    subjectNeeds: 'Mathématiques',
    lastContact: '2023-10-24', 
    remainingHours: 0,
    source: 'Site Web',
    potentialValue: 950,
    activities: [
        { id: 'a7', type: 'status_change', content: 'Devis validé par SMS', date: '2023-10-24', user: 'Matthieu' }
    ]
  },
  { 
    id: '7', 
    name: 'Famille Morel', 
    email: 'morel@email.com', 
    phone: '07 88 99 66 55', 
    city: 'Narbonne', 
    status: 'Perdu', 
    children: ['Chloé (CM2)'], 
    subjectNeeds: 'Français',
    lastContact: '2023-09-10', 
    remainingHours: 0,
    source: 'Inconnu',
    potentialValue: 600,
    activities: [
        { id: 'a8', type: 'note', content: 'A choisi un concurrent moins cher', date: '2023-09-10', user: 'Matthieu' }
    ]
  },
  { 
    id: '8', 
    name: 'Famille Leroy', 
    email: 'leroy@email.com', 
    phone: '06 55 55 55 55', 
    city: 'Sigean', 
    status: 'À reconduire', 
    children: ['Tom (5ème)'], 
    subjectNeeds: 'Anglais',
    lastContact: '2023-10-26', 
    remainingHours: 0,
    source: 'Ancien Client',
    potentialValue: 850, // Montant ancien contrat
    activities: [
        { id: 'a9', type: 'note', content: 'Fin du carnet de 20h. À relancer pour renouvellement.', date: '2023-10-26', user: 'Système' }
    ]
  },
];

export const MOCK_TEACHERS: Teacher[] = [
  { id: '101', name: 'Jean Valjean', email: 'j.valjean@prof.com', phone: '07 00 00 00 01', subjects: ['Maths', 'Physique'], cities: ['Narbonne', 'Vinassan'], status: 'Actif', skills: ['Pédagogue', 'Lycée'] },
  { id: '102', name: 'Cosette Thénardier', email: 'cosette@prof.com', phone: '07 00 00 00 02', subjects: ['Anglais', 'Français'], cities: ['Narbonne', 'Sigean'], status: 'Actif', skills: ['Certifié', 'Collège'] },
  { id: '103', name: 'Marius Pontmercy', email: 'marius@prof.com', phone: '07 00 00 00 03', subjects: ['Histoire', 'Philo'], cities: ['Narbonne'], status: 'Candidat', skills: ['Débutant'] },
  { id: '104', name: 'Gavroche', email: 'gavroche@prof.com', phone: '07 00 00 00 04', subjects: ['Maths'], cities: ['Coursan'], status: 'Inactif', skills: [] },
];

export const MOCK_MISSIONS: Mission[] = [
  { id: 'm1', familyId: '2', familyName: 'Famille Martin', subject: 'Mathématiques', level: 'Terminale', hoursPerWeek: 2, status: 'En recherche' },
  { id: 'm2', familyId: '1', familyName: 'Famille Dupont', subject: 'Anglais', level: '3ème', hoursPerWeek: 1.5, status: 'Validée', assignedTeacherId: '102' },
  { id: 'm3', familyId: '3', familyName: 'Famille Bernard', subject: 'Français', level: '1ère', hoursPerWeek: 2, status: 'Proposition', assignedTeacherId: '102' },
];

export const MOCK_REPORTS: Report[] = [
  { id: 'r1', date: '2023-10-10', teacherName: 'Cosette Thénardier', studentName: 'Léa Dupont', content: 'Bonne progression sur la grammaire. Attention aux verbes irréguliers.', status: 'En attente' },
  { id: 'r2', date: '2023-10-03', teacherName: 'Jean Valjean', studentName: 'Lucas Martin', content: 'Chapitre sur les intégrales terminé. Exercices à faire pour la semaine prochaine.', status: 'Validé' },
];

export const MOCK_FINANCIALS: FinancialStats = {
  month: {
    signed: 4200,
    pipe: 2450, 
    objective: 5500
  },
  year: {
    signed: 84000,
    pipe: 2450, 
    objective: 110000 
  }
};

// --- SETTINGS MOCK DATA ---

export const MOCK_PRICING: PricingRule[] = [
    { id: 'p1', level: 'Primaire', basePrice: 38 },
    { id: 'p2', level: 'Collège', basePrice: 42 },
    { id: 'p3', level: 'Lycée', basePrice: 46 },
    { id: 'p4', level: 'Supérieur / Prépa', basePrice: 52 },
];

export const MOCK_ZONES: GeographicZone[] = [
    { id: 'z1', name: 'Zone A (Narbonne +5km)', supplement: 0 },
    { id: 'z2', name: 'Zone B (+15km)', supplement: 4 },
    { id: 'z3', name: 'Zone C (+30km)', supplement: 8 },
];

export const MOCK_SALARIES: SalaryRule[] = [
    { id: 's1', qualification: 'Étudiant (Bac+3)', hourlyWageBrut: 15, hourlyWageNet: 12 },
    { id: 's2', qualification: 'Professeur Expérimenté', hourlyWageBrut: 20, hourlyWageNet: 16 },
    { id: 's3', qualification: 'Professeur Certifié/Agrégé', hourlyWageBrut: 28, hourlyWageNet: 22 },
];

export const MOCK_DOCUMENTS: DocumentTemplate[] = [
    { id: 'd1', name: 'Modèle de Devis 2025.docx', type: 'Devis', lastUpdated: '01/01/2025' },
    { id: 'd2', name: 'Contrat Mandat Famille.pdf', type: 'Contrat Famille', lastUpdated: '15/12/2024' },
    { id: 'd3', name: 'Contrat Travail CDD d\'usage.docx', type: 'Contrat Travail', lastUpdated: '01/01/2025' },
    { id: 'd4', name: 'Grille Tarifaire Interne.xlsx', type: 'Facture', lastUpdated: '10/01/2025' },
];
