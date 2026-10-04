import axios from 'axios';
const apiurl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiurl,
});

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("access_token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config;
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes('/auth/login');
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;