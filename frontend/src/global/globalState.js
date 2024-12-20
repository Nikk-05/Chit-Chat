import { create } from 'zustand'
import axiosInstance from '../lib/axios.js'

export const useAuthState = create((set) => ({
    authUser: null,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check-auth/')
            set({ authUser: response.data })
        }
        catch (error) {
            set({ authUser: null })
            console.error("Error in check-auth " , error)
        }
        finally {
            set({ isCheckingAuth: false })
        }
    }
}))