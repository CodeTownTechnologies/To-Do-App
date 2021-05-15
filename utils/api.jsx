import axios from 'axios';

let instance = axios.create({
    baseURL: 'http://127.0.0.1:3333/',
});

export const apiConfig = instance
