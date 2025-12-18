
import { Family, Teacher, Mission, Report, FinancialStats, PricingRule, GeographicZone, SalaryRule, DocumentTemplate, Child } from '../types';

export const MOCK_FAMILIES: Family[] = [
  { 
    id: '1', 
    name: 'Dupont', 
    civility: 'Mme',
    firstName: 'Sophie',
    lastName: 'Dupont',
    email: 'dupont@email.com', 
    phone: '06 12 34 56 78', 
    address: '12 rue des Roses',
    zipCity: '11100 Narbonne',
    country: 'France',
    city: 'Narbonne', 
    status: 'Gagné', 
    children: [
      {
        id: 'c1',
        firstName: 'Léa',
        class: '3ème',
        subjects: 'Maths, Physique',
        needs: 'Confiance en soi et méthodologie',
        average: '11/20',
        school: 'Collège Victor Hugo',
        orientation: 'Seconde Générale',
        personality: 'Sérieuse mais réservée',
        hobbies: 'Danse, Lecture',
        availability: 'Mercredi après-midi'
      }
    ], 
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
    name: 'Lemoine', 
    civility: 'Mr',
    firstName: 'Matthieu',
    lastName: 'Lemoine',
    email: 'm.lemoine@email.fr',
    phone: '06 67 00 00 00',
    address: '45 Avenue de la Mer',
    zipCity: '11100 Narbonne',
    country: 'France',
    city: 'Narbonne',
    status: 'Gagné',
    children: [
      {
        id: 'c2',
        firstName: 'Paul',
        class: 'Terminale',
        subjects: 'Mathématiques (Spé)',
        needs: 'Préparation Bac et mention',
        average: '14/20',
        school: 'Lycée Lacroix',
        orientation: 'CPGE Maths Sup',
        personality: 'Compétiteur',
        hobbies: 'Rugby',
        availability: 'Mardi soir, Samedi matin'
      }
    ],
    lastContact: '2023-10-14',
    remainingHours: 12.5,
    source: 'Bouche à oreille',
    potentialValue: 2400,
    activities: []
  },
  { 
    id: '3', 
    name: 'Bernard', 
    civility: 'Mme',
    firstName: 'Isabelle',
    lastName: 'Bernard',
    email: 'bernard@email.com', 
    phone: '06 11 22 33 44', 
    address: '5 Impasse des Pins',
    zipCity: '11430 Gruissan',
    country: 'France',
    city: 'Gruissan', 
    status: 'Contact', 
    children: [
      {
        id: 'c3',
        firstName: 'Emma',
        class: '1ère',
        subjects: 'Français',
        needs: 'Préparation EAF',
        average: '10/20',
        school: 'Lycée de Gruissan',
        orientation: 'Non définie',
        personality: 'Créative',
        hobbies: 'Dessin',
        availability: 'Lundi 17h'
      }
    ], 
    subjectNeeds: 'Français',
    lastContact: '2023-10-15', 
    remainingHours: 0,
    source: 'Google Maps',
    potentialValue: 600,
    activities: [
      { id: 'a4', type: 'call', content: 'Message vocal laissé.', date: '2023-10-15', user: 'Matthieu' }
    ]
  }
];

export const MOCK_TEACHERS: Teacher[] = [
  { id: '101', name: 'Juliette Sagot', email: 'j.sagot@profs.fr', phone: '07 88 00 00 01', subjects: ['Maths', 'Physique'], cities: ['Narbonne'], status: 'Actif', skills: ['Lycée', 'Supérieur'] },
  { id: '102', name: 'Jean Valjean', email: 'j.valjean@prof.com', phone: '07 00 00 00 01', subjects: ['Maths', 'Physique'], cities: ['Narbonne', 'Vinassan'], status: 'Actif', skills: ['Pédagogue', 'Lycée'] },
  { id: '103', name: 'Cosette Thénardier', email: 'cosette@prof.com', phone: '07 00 00 00 02', subjects: ['Anglais', 'Français'], cities: ['Narbonne', 'Sigean'], status: 'Actif', skills: ['Certifié', 'Collège'] },
];

export const MOCK_MISSIONS: Mission[] = [
  { id: 'm1', familyId: '1', familyName: 'Dupont', subject: 'Anglais', level: '3ème', hoursPerWeek: 1.5, sessionDuration: 1.5, weeksCount: 10, hourlyRate: 42, totalAmount: 630, status: 'Validée', assignedTeacherId: '103' },
  { id: 'm2', familyId: '2', familyName: 'Lemoine', subject: 'Mathématiques', level: 'Terminale', hoursPerWeek: 1.5, sessionDuration: 1.5, weeksCount: 20, hourlyRate: 46, totalAmount: 1380, status: 'Validée', assignedTeacherId: '101' },
];

export const MOCK_REPORTS = [
  { id: 'r1', date: '2023-10-10', teacherName: 'Cosette Thénardier', studentName: 'Léa Dupont', content: 'Bonne progression sur la grammaire.', status: 'En attente' },
];

export const MOCK_FINANCIALS: FinancialStats = {
  month: { signed: 4200, pipe: 2450, objective: 5500 },
  year: { signed: 84000, pipe: 2450, objective: 110000 }
};

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
];
