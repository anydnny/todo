export interface taskProjectSelect {
  id: string;
  title: string;
}
export type UiInitialState = {
  currentProjectId: string;
  createTaskProjectSelect: taskProjectSelect;
  popups: PopupItem[];
};

export type PopupItem = {
  id: string;
  title: string;
  kind: 'error' | 'success' | 'info';
};
