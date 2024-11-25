import axios from 'axios';


const BASE_URL = "http://localhost:8000";
// const BASE_URL = "https://ecommerce-server-m7b4.onrender.com";


export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});