import { NavItem, ServiceItem, Review } from './types';

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
    colSpan: 'md:col-span-1 md:row-span-1',
    modalTitle: 'Soutien Hebdomadaire',
    modalContent: 'Un accompagnement régulier tout au long de l\'année est la clé de la réussite. Nos tuteurs s\'adaptent au rythme de votre enfant pour consolider les bases, acquérir de la méthode et reprendre confiance. Remplissez le formulaire ci-dessous pour qu\'un conseiller pédagogique évalue vos besoins.'
  },
  {
    id: 'stages',
    title: 'Stages Vacances',
    description: 'Des sessions intensives en cours particuliers à domicile. Pas de cours en groupe.',
    iconName: 'Zap',
    linkText: 'Réserver son stage',
    colSpan: 'md:col-span-1 md:row-span-1',
    modalTitle: 'Stages Vacances',
    modalContent: 'Idéal pour préparer la rentrée ou se remettre à niveau. Nous proposons exclusivement des stages individuels à domicile pour une efficacité maximale. Profitez des vacances pour combler des lacunes ciblées.'
  },
  {
    id: 'examens',
    title: 'Prépa Examens',
    description: 'Brevet, Bac, Grand Oral. Objectif mention avec nos coachs experts.',
    iconName: 'GraduationCap',
    linkText: 'Se préparer',
    colSpan: 'md:col-span-1 md:row-span-1',
    modalTitle: 'Préparation aux Examens',
    modalContent: 'Mettez toutes les chances de votre côté pour le Brevet, le Bac ou le Grand Oral. Nos coachs experts travaillent sur la méthodologie et les points clés du programme.'
  },
  {
    id: 'ateliers',
    title: 'Ateliers Thématiques',
    description: 'Orientation, Troubles de l\'apprentissage (DYS), Recherche de stage, Méthodologie du travail.',
    iconName: 'BrainCircuit',
    linkText: 'En savoir plus',
    colSpan: 'md:col-span-1 md:row-span-1',
    badge: 'Prochainement dans votre agence',
    modalTitle: 'Ateliers Thématiques',
    modalContent: 'Ces ateliers spécialisés (Orientation, DYS, Méthodologie) seront bientôt disponibles dans votre agence Via Schola. Contactez-nous pour être tenu informé.'
  }
];

export const COMPANY_INFO = {
  name: "Via Schola",
  phone: "06 67 59 25 55",
  email: "contact@via-schola.fr",
  address: "Le Grand Narbonne",
  siret: "123 456 789 00012",
  sapNumber: "SAP123456789"
};

// Exporting REVIEWS to satisfy import in Testimonials, even if not used.
export const REVIEWS: Review[] = [
  {
    id: '1',
    rating: 5,
    text: "Grâce à Via Schola, ma fille a repris confiance en elle en maths. L'intervenant est pédagogue et très patient. Le crédit d'impôt immédiat est un vrai plus !",
    author: "Sophie M.",
    role: "Parent d'élève (3ème)"
  },
  {
    id: '2',
    rating: 5,
    text: "Un suivi de qualité pour la préparation du Bac. Des méthodes de travail efficaces qui ont porté leurs fruits. Je recommande vivement.",
    author: "Pierre L.",
    role: "Parent d'élève (Terminale)"
  },
  {
    id: '3',
    rating: 5,
    text: "Très satisfaite des stages vacances. Mon fils a pu combler ses lacunes avant la rentrée. L'équipe est à l'écoute et réactive.",
    author: "Marie D.",
    role: "Parent d'élève (5ème)"
  }
];