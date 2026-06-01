let selectedProjectId: number | null = null;

export const projectStore = {
  get: () => selectedProjectId,
  set: (id: number | null) => {
    selectedProjectId = id;
  },
};