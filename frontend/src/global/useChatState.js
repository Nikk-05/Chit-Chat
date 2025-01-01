import { create } from 'zustand'
import axiosInstance from '../lib/axios'
import { toast } from 'react-toastify'

export const useChatState = create((set) => ({
    chats: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const response = await axiosInstance.get('/chat/users')
            set({ users: response.data.data })
        }
        catch (error) {
            console.error(`During user loading ${error}`)
        }
        finally {
            set({ isUserLoading: false })
        }
    },

    getMessages : async (userId) =>{
        set({ isMessageLoading: true })
        try {
            const response = await axiosInstance.get(`/chat/${userId}`)
            console.log(response.data)
            console.log("get messages")
        }
        catch (error) {
            console.error(`During message loading ${error}`)
        }
        finally {
            set({ isMessageLoading: false })
        }
    },

    sendMessage: async (message, userId) => {
        set({ isMessageLoading: true })
        try {
            const response = await axiosInstance.post(`/chat/${userId}`, { message })
            console.log(response.data)
            console.log("send message")
        }
        catch (error) {
            toast.error(error.response.data.message)
            console.error(`Error during message sending ${error}`)
        }
        finally {
            set({ isMessageLoading: false })
        }
    }
}))