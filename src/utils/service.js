import axios from 'axios'

const service = axios.create({
    baseURL: 'http://106.55.105.100:8888',
    timeout: 15000
})

service.interceptors.response.use(success => {
    if (success.status && success.status === 200) {
        return success.data
    }

    return success.data
}, error => {
    if (error.response.code === 500) {
    }

    return
})

export default service