import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

const axiosParams = {
  baseURL: "http://localhost:3001"
}

const axiosInstance = axios.create(axiosParams)

function api(axios: AxiosInstance) {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) => {
      return axios.get<T>(url, config)
    },
    delete: <T>(url: string, config: AxiosRequestConfig = {}) => {
      return axios.delete<T>(url, config)
    },
    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
      return axios.post<T>(url, body, config)
    },
    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
      return axios.patch<T>(url, body, config)
    },
    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
      return axios.put<T>(url, body, config)
    }
  }
}

export default api(axiosInstance)