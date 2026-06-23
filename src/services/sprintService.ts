import api from "../api/axios";

export const generateSprintPlan =
async (
  projectId: string,
  capacity: number
) => {

  const response =
    await api.get(
      `/api/ai/sprint-plan/${projectId}?capacity=${capacity}`
    );

  return response.data;
};

export const approveSprintPlan =
async (
  payload: any
) => {

  const response =
    await api.post(
      "/api/ai/approve-plan",
      payload
    );

  return response.data;
};
export const getProjectSprints =
async (
    projectId:string
) => {

    const response =
        await api.get(
            `/api/sprints/project/${projectId}`
        );

    return response.data;
};