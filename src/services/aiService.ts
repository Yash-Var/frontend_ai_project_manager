import api from "../api/axios";

export const getProjectRisk =
async (
    projectId: string
) => {

    const response =
        await api.get(
            `/api/ai/project-risk/${projectId}`
        );

    return response.data;
};