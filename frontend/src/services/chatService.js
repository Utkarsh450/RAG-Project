import api from "./api";

export const chatService = {

    askQuestion: async (
        question,
        document
    ) => {

        const response =
            await api.post(
                "/ask",
                {
                    question,
                    document
                }
            );

        return response.data;
    }
};