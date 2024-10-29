
export default async function getWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=711879251bab27f7c0e3f0a09650897d&units=metric&lang=zh`
    console.log(url)
    const result = await fetch(url)
    const repo = await result.json()
    if(repo && repo.main)
    {
        console.log(repo.weather)

        return  [{key: "temp", title: "温度",  value:repo.main.temp},{key:"weather", title:"天气", value: repo.weather[0].description}]
    }
    else
    {
        return []
    }
}
