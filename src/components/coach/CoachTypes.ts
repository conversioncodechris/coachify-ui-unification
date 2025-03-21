
export interface Message {
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  sources?: Source[];
}

export interface Source {
  title: string;
  content: string;
  url?: string;
}

export interface CoachPersona {
  name: string;
  description: string;
  expertise: string[];
  image: string;
}

export interface CoachTopic {
  icon: string;
  title: string;
  description: string;
  content?: string;
  hidden?: boolean;
  pinned?: boolean;
  isNew?: boolean;
  roleplay?: RoleplayScenario;
}

export interface RoleplayScenario {
  agentRole: string;
  clientProfile: string;
  setting: string;
  objectives: string[];
  backgroundInfo: string;
  keyPoints: string[];
}
