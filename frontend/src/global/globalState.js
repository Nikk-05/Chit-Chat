import { create } from 'zustand'
import axiosInstance from '../lib/axios.js'
import { toast } from 'react-toastify'

export const useAuthState = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isLogout: false,
    isUpdationProfilePicture: false,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check-auth/')
            const accessToken = response.data.data.accessToken; // Extract access token
            localStorage.setItem('access_token', accessToken); // Save securely
            axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
            set({ authUser: response.data})
        }
        catch (error) {
            set({ authUser: null })
            console.error("Error in check-auth ", error)
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },
    signUpHandler: async (values) => {
        set({ isSigningUp: true })
        try {
            const response = await axiosInstance.post('./auth/signup', values)
            const accessToken = response.data.data.accessToken; // Extract access token
            localStorage.setItem('access_token', accessToken); // Save securely
            axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
            toast.success("User signed up")
            set({ authUser: response.data})
        }
        catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                // You can set this error message to display on the UI
                toast.error(data.message || "An error occurred, please try again.");
            } else {
                // If no response is available, log or handle a generic error
                toast.error(error.message || "Network error, please try again later.");
            }
        }
        finally {
            set({ isSigningUp: false })
        }
    },
    logInHandler: async (values) => {
        set({ isLoggingIn: true })
        try {
            const response = await axiosInstance.post('./auth/login', values)
            const accessToken = response.data.data.accessToken; // Extract access token
            console.log(accessToken)
            localStorage.setItem('access_token', accessToken); // Save securely
            axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
            toast.success(`Welcome User`)
            set({ authUser: response.data})
        }
        catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                // You can set this error message to display on the UI
                toast.error(data.message || "An error occurred, please try again.");
            } else {
                // If no response is available, log or handle a generic error
                toast.error(error.message || "Network error, please try again later.");
            }
        }
        finally {
            set({ isLoggingIn: false })
        }
    },
    logoutHandler: async () => {
        try {
            const response = await axiosInstance.get('/auth/logout')
            localStorage.removeItem('access_token');
            // Remove Authorization header from axiosInstance
            delete axiosInstance.defaults.headers.Authorization;
            set({ authUser: null })
            set({ isLogout: true })
            toast.success(response.data.message)
        }
        catch (error) {
            toast.error(error.response.data.message)
        }
        finally {
            // Remove Authorization header from axiosInstance
            delete axiosInstance.defaults.headers.Authorization;
            set({ isLogout: true })
            set({ authUser: null })
        }
    },
    updateProfilePictureHandler: async (file) => {
        set({ isUpdationProfilePicture: true })
        try {
            const formData = new FormData()
            formData.append('profilePic', file)
            const response = await axiosInstance.post('/auth/update-profile', formData)
            toast.success(response.data.message)
            set({ authUser: response.data })
        }
        catch (error) {
            toast.error(error.response.data.message)
            console.error("Error in update-profile-picture ", error)
        }
        finally {
            set({ isUpdationProfilePicture: false })
        }
    }

}))