import api from "../api/axios";

export const getTeamWorkload =
async (
    projectId: string
) => {

    const response =
        await api.get(
            `/api/projects/team-workload/${projectId}`
        );

    return response.data;
};