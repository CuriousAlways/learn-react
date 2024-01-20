import axios from 'axios';

const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline'
const ICON_BASE_URL = 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color'

const currentWheather = (city) => {
  return axios
          .get(`${BASE_URL}/${city}?unitGroup=uk&key=${import.meta.env.VITE_VISUAL_CROSSING_WEATHER_API_KEY}&contentType=json&iconSet=icons1`)
          .then((response) => response.data);
}

export default {
  currentWheather,
  iconUrl: ICON_BASE_URL
};
