
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
