
export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatSession {
  id: string;
  createdAt: string;
  updatedAt: string;
  githubRepoUrl: string;
  githubToken?: string;
  repoName: string;
  branchName?: string;
  status: 'processing' | 'ready' | 'error';
  userId: string;
  user?: User;
  messages?: Message[];
  _count?: {
    messages: number;
  };
}

export interface Message {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  role: 'user' | 'assistant';
  filesReferences?: FileReference[];
  chatSessionId: string;
  chatSession?: ChatSession;
}

export interface FileReference {
  fileName: string;
  filePath: string;
  lineNumbers?: number[];
  excerpt?: string;
}

export interface SourceCodeEmbedding {
  id: string;
  createdAt: string;
  updatedAt: string;
  sourceCode: string;
  fileName: string;
  filePath: string;
  summary: string;
  language?: string;
  fileSize?: number;
  chatSessionId: string;
}

export interface Commit {
  id: string;
  createdAt: string;
  updatedAt: string;
  commitMessage: string;
  commitHash: string;
  commitAuthorName: string;
  commitAuthorEmail: string;
  commitAuthorAvatar?: string;
  commitDate: string;
  summary?: string;
  filesChanged?: any;
  chatSessionId: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface GitHubRepo {
  owner: string;
  repo: string;
  branch?: string;
  url: string;
  private: boolean;
  description?: string;
}

export interface ProcessingStatus {
  status: 'idle' | 'cloning' | 'analyzing' | 'indexing' | 'complete' | 'error';
  progress: number;
  message: string;
  error?: string;
}
