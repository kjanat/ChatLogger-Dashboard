import { ReactNode } from 'react';
import { User } from './api';
interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}
export declare function AuthProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useAuth(): AuthContextType;
export {};
