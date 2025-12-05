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

export type PageView = 'home' | 'construction-famille' | 'construction-enseignant';

export interface Review {
  id: string;
  rating: number;
  text: string;
  author: string;
  role: string;
}