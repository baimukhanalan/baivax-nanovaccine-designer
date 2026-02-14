import { createClient } from '@blinkdotnew/sdk';

function getProjectId(): string {
  const envId = import.meta.env.VITE_BLINK_PROJECT_ID;
  if (envId) return envId;
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const match = hostname.match(/^([^.]+)\.sites\.blink\.new$/);
  if (match) return match[1];
  return 'vacuaikz-platform-fu2sc5rt';
}

export const blink = createClient({
  projectId: getProjectId(),
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY,
  auth: { mode: 'headless' }, // Using headless for custom UI control
});

export type Project = {
  id: string;
  userId: string;
  name: string;
  description?: string;
  virusStrain: string;
  fastaData?: string;
  analysisResults?: string; // JSON string
  mrnaSequence?: string;
  lnpComposition?: string; // JSON string
  vaccineType?: string;
  geneticAdaptation?: string; // JSON string
  status: 'draft' | 'analyzing' | 'completed';
  timeSaved: number; // in hours
  createdAt: string;
};
