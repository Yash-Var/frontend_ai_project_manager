// epicService.ts

import api from "../api/axios";

export const getProjectEpics =
async (
    projectId:string
) => {

    const response =
        await api.get(
            `/api/epics/project/${projectId}`
        );

    return response.data;
};