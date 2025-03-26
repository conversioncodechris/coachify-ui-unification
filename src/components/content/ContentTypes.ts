
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

export interface ContentOutput {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  email?: string;
  blog?: string;
  other?: string;
}
