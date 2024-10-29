import getWeatherByCity from '../_thirdApi'

export default async function handler(req, res) {
    const {city} = req.query
    let result = {infos:[]}
    result.infos = await getWeatherByCity(encodeURI(city))
    res.status(200).json(result)
    // Pass data to the page via props
}
