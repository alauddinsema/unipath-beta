
export type MessageRole = 'assistant' | 'user' | 'system';

export type Message = {
  id: string;
  content: string;
  role: 'assistant' | 'user';
  timestamp: Date;
  error?: boolean;
};

// Type for API communication - can include system role
export type ApiMessage = {
  role: MessageRole;
  content: string;
};

export const PLATFORM_KNOWLEDGE = [
  "UniPath helps students find and apply to universities worldwide.",
  "The platform offers university search with advanced filters.",
  "Users can upload and manage application documents securely.",
  "The built-in browser allows research without leaving the platform.",
  "AI tools help with essay improvement and application review.",
  "Users can save favorite universities and add notes.",
  "The platform offers different subscription plans with varying features.",
  "Credits are used for advanced searches and AI assistance."
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: "Hello! I'm your UniPath AI assistant powered by Gemini. I can help with university applications, answer questions about our platform, and provide guidance for your academic journey. How can I assist you today?",
    role: 'assistant',
    timestamp: new Date(),
  },
];
