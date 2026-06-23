import api from "../api/axios";

export const getProjectMembers =
async (
    projectId:string
) => {

    const response =
        await api.get(
            `/api/projects/${projectId}/members`
        );

    return response.data;
};

export const addProjectMember =
async (
    projectId:string,
    userId:string
) => {

    return api.post(
        `/api/projects/${projectId}/members`,
        {
            userId
        }
    );
};