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
            toast.error("Something went wrong!")
            console.error(`During user loading ${error}`)
        }
        finally {
            set({ isUserLoading: false })
        }
    },

    getMessages: async (userId) => {
        set({ isMessageLoading: true })
        try {
            const response = await axiosInstance.get(`/chat/${userId}`)
            const values = response.data.data
            const chatData = []
            values.map((value) => {
                chatData.push({
                    _id: value._id,
                    sender: value.senderId,
                    receiver: value.receiverId,
                    images: value.images,
                    updatedAt: value.updatedAt,
                    message: value.message,
                    createdAt: value.createdAt
                })
            })
            set({ chats: chatData })
        }
        catch (error) {
            console.error(`During message loading ${error}`)
        }
        finally {
            set({ isMessageLoading: false })
        }
    },

    sendMessage: async (userId, message) => {
        set({ isMessageLoading: true })
        try {
            const formData = new FormData()
            if (message.text) {
                formData.append('message', message.text)
            }
            if (message.image) {
                formData.append('images', message.image)
            }
            const response = await axiosInstance.post(`/chat/${userId}/send`, formData)
            const values = response.data.data
            const chatData = []
            chatData.push({
                _id: values._id,
                sender: values.senderId,
                receiver: values.receiverId,
                images: values.images,
                updatedAt: values.updatedAt,
                message: values.message,
                createdAt: values.createdAt
            })
            set({ chats: chatData })
        }
        catch (error) {
            console.error(error)
        }
        finally {
            set({ isMessageLoading: false })
        }
    },

    setSelectedUser: (user) => {
        set({ selectedUser: user })
    }
}))