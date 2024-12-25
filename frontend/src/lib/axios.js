import axios from 'axios'

const accessToken = localStorage.getItem('access_token')
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3030/api/v1',
    headers: {
        Authorization: `Bearer ${accessToken}`, // Send access token
    },
    withCredentials: true,
})


export default axiosInstance