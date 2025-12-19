
export interface TutorialModule {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface MockCybertip {
  reportId: string;
  dateReported: string;
  serviceProvider: string;
  incidentType: string;
  subject: {
    name: string;
    email: string;
    ipAddress: string;
    location: string;
    timestamp: string;
  };
  files: Array<{
    fileName: string;
    md5: string;
    sha1: string;
    description: string;
  }>;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
