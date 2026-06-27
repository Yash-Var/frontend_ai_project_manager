import api from "../api/axios";

export const getTasks =
async (
    projectId: string
) => {

    const response =
        await api.get(
            `/api/tasks/project/${projectId}`
        );

    return response.data;
};

export const getProjectTasks =
async (
    projectId:string
) => {

    const response =
        await api.get(
            `/api/tasks/project/${projectId}`
        );

    return response.data;
};

export const updateTaskStatus =
async (
    taskId:string,
    status:string
) => {

    const response =
        await api.post(
            `/api/tasks/${taskId}/status`,
            {
                status
            }
        );

    return response.data;
};
export const getTaskDetails =
async (
    taskId: string
) => {

    const response =
        await api.get(
            `/api/tasks/${taskId}`
        );

    return response.data;
};

export const getTaskActivity =
async (
    taskId: string
) => {

    const response =
        await api.get(
            `/api/tasks/task/${taskId}`
        );

    return response.data;
};