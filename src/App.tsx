import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Chats from './pages/Chats'
import ChatDetail from './pages/ChatDetail'
import Profile from './pages/Profile'
import { AuthProvider } from './utils/AuthContext'
import { ProtectedRoute } from './utils/ProtectedRoute'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        
                        {/* Protected routes - require authentication */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="chats" element={<Chats />} />
                            <Route path="chats/:id" element={<ChatDetail />} />
                            <Route path="profile" element={<Profile />} />
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default App 
