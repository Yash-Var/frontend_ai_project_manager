import api from "../api/axios";

export interface AIChatRequest {

    projectId: string;

    question: string;

}

export interface AIChatResponse {

    answer: string;

}

export const askAI = async (

    request: AIChatRequest

): Promise<AIChatResponse> => {

    const response =
        await api.post(
            "/api/ai/chat",
            request
        );

    return response.data;
};