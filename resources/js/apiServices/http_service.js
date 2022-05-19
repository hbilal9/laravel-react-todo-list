import axios from 'axios';

export function http() {
  return axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'Application/json'
    }
  });
}

export function httpFile() {
  return axios.create({
    baseURL: '/api',
    headers: {
      // Authorization: 'Bearer '+auth.getAccessToken(),
      'Content-Type': 'multipart/form-data'
    }
  });
}
