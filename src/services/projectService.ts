import api from "../api/axios";

export const getProjects =
async () => {

    const response =
        await api.get(
            "/api/projects"
        );

    return response.data;
};

export const createAIProject =
async (
    data:{
        name:string;
        requirement:string;
    }
) => {

    const response =
        await api.post(
            "/api/ai/create-project",
            data
        );

    return response.data;
};

export const autoAssignTasks =
async (
    projectId:string
) => {

    await api.post(
        `/api/projects/${projectId}/auto-assign`
    );
};