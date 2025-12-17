
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlight?: boolean;
  linkText: string;
  colSpan?: string; // For Bento grid layout
  badge?: string;
  modalTitle?: string;
  modalContent?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export type PageView = 
  | 'home' 
  | 'construction-famille' 
  | 'construction-enseignant' 
  | 'admin'
  | 'dashboard-famille'
  | 'dashboard-enseignant';

export interface Review {
  id: string;
  rating: number;
  text: string;
  author: string;
  role: string;
}

// CRM Types

// Nouveaux statuts pour le Kanban
export type PipelineStatus = 
  | 'Nouveau' 
  | 'Contact' 
  | 'Devis' 
  | 'Contrat' 
  | 'Gagné' 
  | 'À reconduire'
  | 'Perdu' 
  | 'Archivé';

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'note' | 'status_change' | 'quote' | 'meeting';
  content: string;
  date: string;
  user: string; // "Matthieu", "Système", etc.
}

export interface Family {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: PipelineStatus; // Updated status type
  children: string[];
  lastContact: string; // Date ISO YYYY-MM-DD
  remainingHours: number; // Pour le renouvellement
  subjectNeeds?: string; // Pour l'affichage carte
  source?: string; // Pour le détail
  potentialValue: number; // Montant estimé du contrat
  activities: Activity[]; // Historique
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subjects: string[];
  cities: string[];
  status: 'Candidat' | 'Validé' | 'Actif' | 'Inactif';
  skills: string[];
}

export interface Mission {
  id: string;
  familyId: string;
  familyName: string;
  subject: string;
  level: string;
  hoursPerWeek: number;
  status: 'En recherche' | 'Proposition' | 'Validée' | 'Terminée';
  assignedTeacherId?: string;
}

export interface Report {
  id: string;
  date: string;
  teacherName: string;
  studentName: string;
  content: string;
  status: 'En attente' | 'Validé';
}

export interface FinancialStats {
  month: {
    signed: number;
    pipe: number;
    objective: number;
  };
  year: {
    signed: number;
    pipe: number;
    objective: number; // YTD Objective or Total Annual Objective
  }
}

// --- SETTINGS TYPES ---

export interface PricingRule {
    id: string;
    level: string; // Collège, Lycée, Supérieur
    basePrice: number; // Prix de vente horaire
}

export interface GeographicZone {
    id: string;
    name: string; // Narbonne, Grand Narbonne, Hors Zone
    supplement: number; // Supplément par heure ou forfait
}

export interface SalaryRule {
    id: string;
    qualification: string; // Bac+3, Certifié, Agrégé
    hourlyWageBrut: number; // Salaire brut horaire
    hourlyWageNet: number; // Salaire net estimé
}

export interface DocumentTemplate {
    id: string;
    name: string;
    type: 'Devis' | 'Contrat Famille' | 'Contrat Travail' | 'Facture';
    lastUpdated: string;
}