import axios from 'axios'

const globalAxios = axios.create({
    baseURL: '/api',
})

//Global Axios if this is not secured i'll manually do it

globalAxios.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
})

export default globalAxios
2