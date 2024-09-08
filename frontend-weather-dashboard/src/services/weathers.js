import axios from 'axios'
const baseUrl = '/api/weather'

const getWeatherData = async city => {
    const response = await axios.get(`${baseUrl}?city=${city}`)
    return response.data
}


export default { getWeatherData }
