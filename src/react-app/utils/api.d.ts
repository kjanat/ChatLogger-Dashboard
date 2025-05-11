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
    apiKeys?: {
        name: string;
        key: string;
    }[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export declare const authApi: {
    login: (data: LoginRequest) => Promise<any>;
    register: (data: RegisterRequest) => Promise<any>;
    getCurrentUser: () => Promise<any>;
    generateApiKey: () => Promise<any>;
};
export declare const chatApi: {
    getChats: (params?: {
        page?: number;
        limit?: number;
        isActive?: boolean;
    }) => Promise<any>;
    getChat: (id: string) => Promise<any>;
    createChat: (data: {
        title: string;
        organizationId: string;
        userId: string;
        source?: string;
        tags?: string[];
        metadata?: any;
    }) => Promise<any>;
    updateChat: (id: string, data: {
        title?: string;
        tags?: string[];
        metadata?: any;
        isActive?: boolean;
    }) => Promise<any>;
    deleteChat: (id: string) => Promise<any>;
    searchChats: (query: string, params?: {
        page?: number;
        limit?: number;
    }) => Promise<any>;
};
export declare const messageApi: {
    getMessages: (chatId: string, params?: {
        page?: number;
        limit?: number;
        sortBy?: "createdAt" | "role";
        sortOrder?: "asc" | "desc";
    }) => Promise<any>;
    getMessage: (chatId: string, messageId: string) => Promise<any>;
    createMessage: (chatId: string, data: {
        role: "system" | "user" | "assistant" | "function" | "tool";
        content: string;
        name?: string;
        functionCall?: any;
        toolCalls?: any[];
        metadata?: any;
        tokens?: number;
        promptTokens?: number;
        completionTokens?: number;
        latency?: number;
    }) => Promise<any>;
    updateMessage: (chatId: string, messageId: string, data: {
        content?: string;
        metadata?: any;
    }) => Promise<any>;
    deleteMessage: (chatId: string, messageId: string) => Promise<any>;
    createBatchMessages: (chatId: string, messages: Array<{
        role: "system" | "user" | "assistant" | "function" | "tool";
        content: string;
        name?: string;
        functionCall?: any;
        toolCalls?: any[];
        metadata?: any;
        tokens?: number;
        promptTokens?: number;
        completionTokens?: number;
        latency?: number;
    }>) => Promise<any>;
};
export declare const organizationApi: {
    getCurrentOrganization: () => Promise<any>;
    getOrganization: (id: string) => Promise<any>;
    updateOrganization: (id: string, data: {
        name?: string;
        contactEmail?: string;
        description?: string;
        isActive?: boolean;
    }) => Promise<any>;
    regenerateApiKey: (id: string) => Promise<any>;
};
export declare const analyticsApi: {
    getActivityMetrics: (params?: {
        startDate?: string;
        endDate?: string;
    }) => Promise<any>;
    getMessageStats: (params?: {
        startDate?: string;
        endDate?: string;
    }) => Promise<any>;
    getTopUsers: (params?: {
        limit?: number;
        startDate?: string;
        endDate?: string;
    }) => Promise<any>;
};
export declare const exportApi: {
    exportChats: (params?: {
        startDate?: string;
        endDate?: string;
        format?: "json" | "csv";
    }) => Promise<any>;
    exportUserActivity: (params?: {
        startDate?: string;
        endDate?: string;
        format?: "json" | "csv";
    }) => Promise<any>;
};
