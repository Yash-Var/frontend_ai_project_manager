import api from "../api/axios";

export const getDashboard =
async (
    projectId: string
) => {

    const response =
        await api.get(
            `/api/dashboard/${projectId}`
        );

    return response.data;
};