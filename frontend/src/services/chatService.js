import axios from "axios";
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

    getHistory: async (
        document
    ) => {

        const response =
            await api.get(
                "/chat-history",
                {
                    params: {
                        document
                    }
                }
            );

        return response.data;
    },

    streamQuestion: async (
        question,
        document
    ) => {

        let token =
            localStorage.getItem(
                "accessToken"
            );

        let response = await fetch(
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

        if (
            response.status === 401
        ) {

            console.log(
                "401 DETECTED"
            );

            try {

                const refreshToken =
                    localStorage.getItem(
                        "refreshToken"
                    );

                if (!refreshToken) {

                    throw new Error(
                        "No refresh token"
                    );
                }

                const refreshResponse =
                    await axios.post(
                        "http://localhost:8000/api/auth/refresh",
                        {
                            refresh_token:
                            refreshToken
                        }
                    );

                token =
                    refreshResponse.data.access_token;

                localStorage.setItem(
                    "accessToken",
                    token
                );

                console.log(
                    "Token refreshed"
                );

                response = await fetch(
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

            } catch (error) {

                console.error(
                    "Refresh failed:",
                    error
                );

                localStorage.removeItem(
                    "accessToken"
                );

                localStorage.removeItem(
                    "refreshToken"
                );

                window.location.href =
                    "/login";

                throw error;
            }
        }

        return response;
    }
};