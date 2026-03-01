export interface SystemProjectRegistryItem {
  id: string;
  name: string;
}

export const SYSTEM_PROJECTS_REGISTRY: readonly SystemProjectRegistryItem[] = [
  {
    id: 'd406e045-29e0-4ae3-a8b9-aed2622cb328',
    name: 'inbox',
  },
  {
    id: '3fc37f2a-4686-4f20-b7eb-820402978071',
    name: 'учёба',
  },
] as const;
