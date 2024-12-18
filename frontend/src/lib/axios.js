import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3030/api/v1',
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Send access token
    },
    withCredentials: true,
})

export default axiosInstance