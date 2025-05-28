import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://odontoapp-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'User-Agent': 'insomnia/9.3.2' 
  },
  timeout: 30 * 1000,
});

api.interceptors.request.use(async (config: any) => {
   const token = await AsyncStorage.getItem('@auth:token')  
   if (token && config.headers) {
     config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
   }
   return config;
 }); 


export default api;