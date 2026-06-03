import api from "./api";

export const documentService = {

    getDocuments: async () => {

        const response =
            await api.get(
                "/documents"
            );

        return response.data;
    }

};