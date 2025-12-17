
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

export type PageView = 'home' | 'construction-famille' | 'construction-enseignant' | 'admin';

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
  | 'Perdu' 
  | 'Archivé';

export interface Family {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: PipelineStatus; // Updated status type
  children: string[];
  lastContact: string;
  remainingHours: number; // Pour le renouvellement
  subjectNeeds?: string; // Pour l'affichage carte
  source?: string; // Pour le détail
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
