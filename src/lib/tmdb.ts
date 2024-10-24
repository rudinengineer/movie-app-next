import axios, { AxiosRequestConfig } from "axios"

// const API_KEY = "7ea191ebd29124e092f8c8b790c4466d"
const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWExOTFlYmQyOTEyNGUwOTJmOGM4Yjc5MGM0NDY2ZCIsIm5iZiI6MTcyOTYwNDU5MC44NjU4NDksInN1YiI6IjY3MTdhYWJkMDljNDk4ZmQyOWI3ZjY5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-3Ye5gAzHyACbigHfCfCHX8WzJA0mGJS7StWMWdWm1Y"

export const sendRequestTMDB = async (url: string, method: string = 'GET', options: AxiosRequestConfig<any> = {}) => {
    try {
        const response = await axios.request({
            baseURL: 'https://api.themoviedb.org/3',
            url: url,
            method: method,
            headers: {
                "Authorization": 'Bearer ' + API_KEY
            },
            ...options
        })
        return response
    } catch(e: any) {
        return null
    }
}