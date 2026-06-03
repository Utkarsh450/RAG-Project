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
    },

    streamQuestion: async (
    question,
    document
) => {

    const token =
        localStorage.getItem(
            "accessToken"
        );

    return fetch(
        "http://localhost:8000/api/ask-stream",
        {
            method: "POST",

            headers: {
                "Content-Type":
                "application/json",

                Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify({
                question,
                document
            })
        }
    );
}
};