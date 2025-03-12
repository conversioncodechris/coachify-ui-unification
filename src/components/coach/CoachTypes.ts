
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
