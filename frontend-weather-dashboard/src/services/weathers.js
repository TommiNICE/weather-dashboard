import axios from 'axios'
const baseUrl = '/api/weather'

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '',
  });

const getWeatherData = async city => {
    const response = await axiosClient.get(`${baseUrl}?city=${city}`)
    return response.data
}


export default { getWeatherData }
