import { ClientProfile, PhilosophicalPlan, ProfessionalBrand } from '../types';

// Simulating a database with LocalStorage
const DB_KEY = 'tempera_db';

const INITIAL_CLIENTS: ClientProfile[] = [
  {
    id: '1',
    name: 'Arthur Schopenhauer',
    status: 'active',
    currentPlan: {
      lastUpdated: Date.now(),
      focusArea: 'Gestão de Pessimismo',
      morningRoutine: 'Contemplar a Vontade por 10 minutos.',
      dailyReading: 'O Mundo como Vontade e Representação - Cap 3',
      avoidance: 'Esperança infundada em interações sociais.',
      notes: 'Paciente apresenta melhora na aceitação do sofrimento.'
    }
  },
  {
    id: '2',
    name: 'Søren Kierkegaard',
    status: 'active',
    currentPlan: {
      lastUpdated: Date.now(),
      focusArea: 'Salto de Fé',
      morningRoutine: 'Caminhada solitária questionando a existência.',
      dailyReading: 'Temor e Tremor',
      avoidance: 'Paralisia por análise excessiva.',
      notes: 'Angústia estável.'
    }
  },
  {
    id: '3',
    name: 'Friedrich Nietzsche',
    status: 'inactive'
  }
];

const DEFAULT_BRAND: ProfessionalBrand = {
  professionalName: 'Dra. Vanessa (Filósofa Clínica)',
  logoUrl: 'https://cdn-icons-png.flaticon.com/512/3063/3063056.png', // Generic leaf/brain icon
  photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  primaryColor: '#3f6212', // lime-800 (Greenish)
  accentColor: '#84cc16', // lime-500
  backgroundColor: '#f7fee7', // lime-50
  personality: {
    archetype: 'empathetic',
    customInstructions: 'Use uma linguagem acolhedora, focada em crescimento natural e metáforas de jardinagem/natureza.'
  },
  setupComplete: false
};

export const getClients = (): ClientProfile[] => {
  const stored = localStorage.getItem(DB_KEY);
  if (!stored) {
    localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_CLIENTS));
    return INITIAL_CLIENTS;
  }
  return JSON.parse(stored);
};

export const getProfessionalBrand = (): ProfessionalBrand => {
  const stored = localStorage.getItem(DB_KEY + '_brand');
  if (!stored) {
    localStorage.setItem(DB_KEY + '_brand', JSON.stringify(DEFAULT_BRAND));
    return DEFAULT_BRAND;
  }
  return JSON.parse(stored);
};

export const updateProfessionalBrand = (brand: ProfessionalBrand) => {
  localStorage.setItem(DB_KEY + '_brand', JSON.stringify(brand));
};

export const updateClientPlan = (clientId: string, plan: PhilosophicalPlan) => {
  const clients = getClients();
  const updatedClients = clients.map(c => {
    if (c.id === clientId) {
      return { ...c, currentPlan: plan };
    }
    return c;
  });
  localStorage.setItem(DB_KEY, JSON.stringify(updatedClients));
};

export const getClientById = (id: string): ClientProfile | undefined => {
  const clients = getClients();
  return clients.find(c => c.id === id);
};
