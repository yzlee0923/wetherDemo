import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {InfoList, Search} from "@/pages/_components";

export default function Page() {
    const [data, setData] = useState(null)
    const router = useRouter()
    useEffect(() => {
        const {city} = router.query
        if(city)
        {
            const fetchData = async ()  => {
                const response = await fetch('/api/city/' + encodeURIComponent(city))
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const result = await response.json()
                console.log(JSON.stringify(result.infos))
                if(result.infos)
                {
                    setData({infos:result.infos})
                }
                else
                {
                    setData({msg: "没有城市信息，请输入正确的城市英文名"})
                }
            }

            fetchData().catch((e) => {
                // handle the error as needed
                console.error('An error occurred while fetching the data: ', e)
                setData({msg: "网络出错，请稍后再试"})
            })
        }
        else
        {
            setData(null)
        }

    }, [router.query.city])

    let resComponent = '';
    if(router.query.city)
    {
        if(!data)
        {
            resComponent = <p>Loading...</p>
        }
        else if(data.infos)
        {
            resComponent = (
                <div>
                    <div>{router.query.city} 的天气</div>
                    <InfoList {...data}></InfoList>
                </div>
            )
        }
        else if(data.msg)
        {
            resComponent = <p>{data.msg}</p>
        }
    }
    return (
        <div>
            <div>天气预报</div>
            <Search></Search>
            {resComponent}
        </div>)
}