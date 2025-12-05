export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlight?: boolean;
  linkText: string;
  colSpan?: string; // For Bento grid layout
  badge?: string;
}

export interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
  role: string;
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