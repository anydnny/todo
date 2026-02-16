export interface taskProjectSelect {
  id: string;
  title: string;
}
export type UiInitialState = {
  currentProjectId: string | null;
  createTaskProjectSelect: taskProjectSelect;
};
