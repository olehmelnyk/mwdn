import axios from 'axios';

export const myJsonServer = axios.create({
  baseURL: process.env.BASE_URL,
});
