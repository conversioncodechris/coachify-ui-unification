
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
  image: string;
  name: string;
  description: string;
  tag: string;
  hidden?: boolean;
  pinned?: boolean;
}
