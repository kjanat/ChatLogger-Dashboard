import api from './axios';

export interface Chat {
    _id: string;
    userId: string;
    organizationId: string;
    title: string;
    source: 'web' | 'mobile' | 'api' | 'widget';
    metadata?: Record<string, any>;
    tags?: string[];
    isActive?: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Message {
    _id: string;
    chatId: string;
    role: 'system' | 'user' | 'assistant' | 'function' | 'tool';
    content: string;
    name?: string;
    functionCall?: any;
    toolCalls?: any[];
    metadata?: Record<string, any>;
    tokens?: number;
    promptTokens?: number;
    completionTokens?: number;
    latency?: number;
    createdAt: string;
    updatedAt: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    organizationId: string;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    role: 'user' | 'admin' | 'superadmin';
    organizationId: string;
    isActive: boolean;
}

export interface Organization {
    _id: string;
    name: string;
    apiKeys?: { name: string; key: string; }[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export const authApi = {
    login: async (data: LoginRequest) => {
        const response = await api.post('/users/login', data);
        return response.data;
    },
    register: async (data: RegisterRequest) => {
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
    getChats: async (params?: { page?: number; limit?: number; isActive?: boolean; }) => {
        try {
            const response = await api.get('/chats', { params });
            // Return an empty array if response.data.chats is undefined
            return response.data.chats || [];
        } catch (error) {
            console.error('Error fetching chats:', error);
            // Always return an empty array instead of throwing, so the query doesn't return undefined
            return [];
        }
    },
    getChat: async (id: string) => {
        const response = await api.get(`/chats/${id}`);
        return response.data.chat;
    },
    createChat: async (data: { title: string; organizationId: string; userId: string; source?: string; tags?: string[]; metadata?: any; }) => {
        const response = await api.post('/chats', data);
        return response.data.chat;
    },
    updateChat: async (id: string, data: { title?: string; tags?: string[]; metadata?: any; isActive?: boolean; }) => {
        const response = await api.put(`/chats/${id}`, data);
        return response.data.chat;
    },
    deleteChat: async (id: string) => {
        const response = await api.delete(`/chats/${id}`);
        return response.data;
    },
    searchChats: async (query: string, params?: { page?: number; limit?: number; }) => {
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
    getMessages: async (chatId: string, params?: {
        page?: number;
        limit?: number;
        sortBy?: 'createdAt' | 'role';
        sortOrder?: 'asc' | 'desc';
    }) => {
        const response = await api.get(`/messages/${chatId}`, { params });
        return response.data.messages;
    },
    getMessage: async (chatId: string, messageId: string) => {
        const response = await api.get(`/messages/${chatId}/${messageId}`);
        return response.data.message;
    },
    createMessage: async (chatId: string, data: {
        role: 'system' | 'user' | 'assistant' | 'function' | 'tool';
        content: string;
        name?: string;
        functionCall?: any;
        toolCalls?: any[];
        metadata?: any;
        tokens?: number;
        promptTokens?: number;
        completionTokens?: number;
        latency?: number;
    }) => {
        const response = await api.post(`/messages/${chatId}`, data);
        return response.data.message;
    },
    updateMessage: async (chatId: string, messageId: string, data: { content?: string; metadata?: any; }) => {
        const response = await api.put(`/messages/${chatId}/${messageId}`, data);
        return response.data.updatedMessage;
    },
    deleteMessage: async (chatId: string, messageId: string) => {
        const response = await api.delete(`/messages/${chatId}/${messageId}`);
        return response.data;
    },
    createBatchMessages: async (chatId: string, messages: Array<{
        role: 'system' | 'user' | 'assistant' | 'function' | 'tool';
        content: string;
        name?: string;
        functionCall?: any;
        toolCalls?: any[];
        metadata?: any;
        tokens?: number;
        promptTokens?: number;
        completionTokens?: number;
        latency?: number;
    }>) => {
        const response = await api.post(`/messages/batch/${chatId}`, { messages });
        return response.data.messages;
    }
};

export const organizationApi = {
    getCurrentOrganization: async () => {
        const response = await api.get('/organizations/current');
        return response.data.organization;
    },
    getOrganization: async (id: string) => {
        const response = await api.get(`/organizations/${id}`);
        return response.data.organization;
    },
    updateOrganization: async (id: string, data: {
        name?: string;
        contactEmail?: string;
        description?: string;
        isActive?: boolean;
    }) => {
        const response = await api.put(`/organizations/${id}`, data);
        return response.data.organization;
    },
    regenerateApiKey: async (id: string) => {
        const response = await api.post(`/organizations/${id}/regenerate-api-key`);
        return response.data;
    }
};

export const analyticsApi = {
    getActivityMetrics: async (params?: { startDate?: string; endDate?: string; }) => {
        const response = await api.get('/analytics/activity', { params });
        return response.data;
    },
    getMessageStats: async (params?: { startDate?: string; endDate?: string; }) => {
        const response = await api.get('/analytics/messages/stats', { params });
        return response.data;
    },
    getTopUsers: async (params?: { limit?: number; startDate?: string; endDate?: string; }) => {
        const response = await api.get('/analytics/users/top', { params });
        return response.data;
    }
};

export const exportApi = {
    exportChats: async (params?: { startDate?: string; endDate?: string; format?: 'json' | 'csv'; }) => {
        const response = await api.get('/export/chats', { params });
        return response.data;
    },
    exportUserActivity: async (params?: { startDate?: string; endDate?: string; format?: 'json' | 'csv'; }) => {
        const response = await api.get('/export/users/activity', { params });
        return response.data;
    }
}; 
