import axios from 'axios';
const BASE_URL = 'https://prg06.iettech.nl';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }

});