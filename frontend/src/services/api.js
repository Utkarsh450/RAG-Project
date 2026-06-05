import axios from "axios";

const api = axios.create({
    baseURL: "https://rag-project-fhfj.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem(
            "accessToken"
        );

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(
            error
        );
    }
);


api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest =
            error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry =
                true;

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

                const response =
                    await axios.post(
                        "https://rag-project-fhfj.onrender.com/api/auth/refresh",
                        {
                            refresh_token:
                            refreshToken
                        }
                    );

                const newAccessToken =
                    response.data.access_token;

                localStorage.setItem(
                    "accessToken",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(
                    originalRequest
                );

            } catch (refreshError) {

                localStorage.removeItem(
                    "accessToken"
                );

                localStorage.removeItem(
                    "refreshToken"
                );

                window.location.href =
                    "/login";

                return Promise.reject(
                    refreshError
                );
            }
        }

        return Promise.reject(
            error
        );
    }
);

export default api;