import axios from 'axios'

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': 'a789b61f32msh96c0bf462e0eda3p1300e0jsnafcfed34390c'
      }
    })
    return data
  } catch (e) {
    console.log('error in gettung getPlacesData', e)
  }
}
export const getWeatherData = async (lat,lng) => {
  try {
    const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/find',{
      params: {
        lon: lng,
        lat: lat,
      },
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': 'a789b61f32msh96c0bf462e0eda3p1300e0jsnafcfed34390c'
      }
    })
    return data
  }catch (e) {
    console.log('error in getting weather')
  }
}
