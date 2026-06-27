import api from "../api/axios";

export const generateStandup = async (
    projectId: string
) => {

    const response =
        await api.get(
            `/api/ai/standup/${projectId}`
        );

    return response.data;
};