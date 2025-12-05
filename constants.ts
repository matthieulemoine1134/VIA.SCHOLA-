import { NavItem, Review, ServiceItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Devenir Prof', href: '#' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'hebdo',
    title: 'Soutien Hebdomadaire',
    description: 'Un suivi régulier sur-mesure pour consolider les acquis et reprendre confiance, du CP à la Terminale.',
    iconName: 'CalendarClock',
    highlight: true,
    linkText: 'Découvrir le suivi',
    colSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'stages',
    title: 'Stages Vacances',
    description: 'Des sessions intensives en cours particuliers à domicile. Pas de groupes, 100% personnalisé pour préparer la rentrée ou un examen.',
    iconName: 'Zap',
    linkText: 'Voir les dates',
    colSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'examens',
    title: 'Prépa Examens',
    description: 'Brevet, Bac, Grand Oral. Objectif mention avec nos coachs experts.',
    iconName: 'GraduationCap',
    linkText: 'Nos prépas',
    colSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'ateliers',
    title: 'Ateliers Thématiques',
    description: 'Orientation, Troubles de l\'apprentissage (DYS), Recherche de stage, Méthodologie du travail.',
    iconName: 'BrainCircuit',
    linkText: 'En savoir plus',
    colSpan: 'md:col-span-1 md:row-span-1',
    badge: 'Prochainement dans votre agence'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    author: "Sophie M.",
    role: "Maman d'élève (3ème)",
    rating: 5,
    text: "Une approche humaine qui change tout. Ma fille a repris confiance en maths grâce à Thomas. Le crédit d'impôt immédiat est un vrai plus administratif."
  },
  {
    id: 2,
    author: "Marc D.",
    role: "Père d'élève (Terminale)",
    rating: 5,
    text: "L'équipe de Narbonne est très réactive. Le stage de pré-rentrée a été décisif pour le dossier Parcoursup de mon fils."
  },
  {
    id: 3,
    author: "Julie L.",
    role: "Profession Libérale",
    rating: 4,
    text: "J'utilise le dispositif Hexa Coop recommandé par Via Schola. Simple, efficace et fiscalement très intéressant."
  }
];

export const COMPANY_INFO = {
  name: "Via Schola",
  phone: "04 68 12 34 56",
  address: "12 Bd du Dr Lacroix, 11100 Narbonne",
  siret: "123 456 789 00012",
  sapNumber: "SAP123456789"
};