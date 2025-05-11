import api from './axios';
export const authApi = {
    login: async (data) => {
        const response = await api.post('/users/login', data);
        return response.data;
    },
    register: async (data) => {
        console.log('Submitting registration data:', data);
        const response = await api.post('/users/register', data);
        return response.data;
    },
    getCurrentUser: async () => {
        const response = await api.get('/users/profile');
        return response.data.user;
    },
    generateApiKey: async () => {
        const response = await api.post('/users/generate-api-key');
        return response.data;
    }
};
export const chatApi = {
    getChats: async (params) => {
        try {
            const response = await api.get('/chats', { params });
            // Return an empty array if response.data.chats is undefined
            return response.data.chats || [];
        }
        catch (error) {
            console.error('Error fetching chats:', error);
            // Always return an empty array instead of throwing, so the query doesn't return undefined
            return [];
        }
    },
    getChat: async (id) => {
        const response = await api.get(`/chats/${id}`);
        return response.data.chat;
    },
    createChat: async (data) => {
        const response = await api.post('/chats', data);
        return response.data.chat;
    },
    updateChat: async (id, data) => {
        const response = await api.put(`/chats/${id}`, data);
        return response.data.chat;
    },
    deleteChat: async (id) => {
        const response = await api.delete(`/chats/${id}`);
        return response.data;
    },
    searchChats: async (query, params) => {
        const response = await api.get('/chats/search', {
            params: {
                query,
                ...params
            }
        });
        return response.data.chats;
    }
};
export const messageApi = {
    getMessages: async (chatId, params) => {
        const response = await api.get(`/messages/${chatId}`, { params });
        return response.data.messages;
    },
    getMessage: async (chatId, messageId) => {
        const response = await api.get(`/messages/${chatId}/${messageId}`);
        return response.data.message;
    },
    createMessage: async (chatId, data) => {
        const response = await api.post(`/messages/${chatId}`, data);
        return response.data.message;
    },
    updateMessage: async (chatId, messageId, data) => {
        const response = await api.put(`/messages/${chatId}/${messageId}`, data);
        return response.data.updatedMessage;
    },
    deleteMessage: async (chatId, messageId) => {
        const response = await api.delete(`/messages/${chatId}/${messageId}`);
        return response.data;
    },
    createBatchMessages: async (chatId, messages) => {
        const response = await api.post(`/messages/batch/${chatId}`, { messages });
        return response.data.messages;
    }
};
export const organizationApi = {
    getCurrentOrganization: async () => {
        const response = await api.get('/organizations/current');
        return response.data.organization;
    },
    getOrganization: async (id) => {
        const response = await api.get(`/organizations/${id}`);
        return response.data.organization;
    },
    updateOrganization: async (id, data) => {
        const response = await api.put(`/organizations/${id}`, data);
        return response.data.organization;
    },
    regenerateApiKey: async (id) => {
        const response = await api.post(`/organizations/${id}/regenerate-api-key`);
        return response.data;
    }
};
export const analyticsApi = {
    getActivityMetrics: async (params) => {
        const response = await api.get('/analytics/activity', { params });
        return response.data;
    },
    getMessageStats: async (params) => {
        const response = await api.get('/analytics/messages/stats', { params });
        return response.data;
    },
    getTopUsers: async (params) => {
        const response = await api.get('/analytics/users/top', { params });
        return response.data;
    }
};
export const exportApi = {
    exportChats: async (params) => {
        const response = await api.get('/export/chats', { params });
        return response.data;
    },
    exportUserActivity: async (params) => {
        const response = await api.get('/export/users/activity', { params });
        return response.data;
    }
};
