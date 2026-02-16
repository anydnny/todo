export type ProjectType = {
  id: number;
  title: string;
  type: string;
  itemCount: number;
};

const projectList: ProjectType[] = [
  {
    id: 1,
    title: 'new',
    type: 'system',
    itemCount: 0,
  },
  {
    id: 2,
    title: 'Работа',
    type: 'custom',
    itemCount: 22,
  },
  {
    id: 3,
    title: 'Дела делишки',
    type: 'custom',
    itemCount: 4,
  },
];

export { projectList };
