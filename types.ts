
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
  type: 'call' | 'email' | 'note' | 'status_change' | 'quote' | 'meeting' | 'contract';
  content: string;
  date: string;
  user: string;
}

export interface Child {
  id: string;
  firstName: string;
  class: string;
  subjects: string;
  needs: string;
  average: string;
  school: string;
  orientation: string;
  personality: string;
  hobbies: string;
  availability: string;
}

export interface Family {
  id: string;
  name: string; // Nom de famille global (utilisé pour l'affichage liste)
  civility: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  zipCity: string;
  country: string;
  city: string; // Pour compatibilité existante
  status: PipelineStatus;
  children: Child[];
  lastContact: string; 
  remainingHours: number;
  subjectNeeds?: string;
  source?: string;
  potentialValue: number;
  activities: Activity[];
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
  childId?: string;
  subject: string;
  level: string;
  hoursPerWeek: number;
  sessionDuration: number; // en heures
  weeksCount: number;
  hourlyRate: number;
  totalAmount: number;
  status: 'En recherche' | 'Proposition' | 'Validée' | 'Terminée';
  assignedTeacherId?: string;
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
    objective: number;
  }
}

export interface PricingRule {
    id: string;
    level: string;
    basePrice: number;
}

export interface GeographicZone {
    id: string;
    name: string;
    supplement: number;
}

export interface SalaryRule {
    id: string;
    qualification: string;
    hourlyWageBrut: number;
    hourlyWageNet: number;
}

export interface DocumentTemplate {
    id: string;
    name: string;
    type: 'Devis' | 'Contrat Famille' | 'Contrat Travail' | 'Facture';
    lastUpdated: string;
}

// Fix: Added missing Report interface as required by mock data
export interface Report {
  id: string;
  date: string;
  teacherName: string;
  studentName: string;
  content: string;
  status: string;
}

// Fix: Added missing KanbanColumnDef interface as used in CRM dashboard
export interface KanbanColumnDef {
  id: PipelineStatus;
  title: string;
  color: string;
  borderColor: string;
}
