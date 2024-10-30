import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {InfoList, Search} from "@/pages/_components";

export default function Page() {
    //天气数据
    const [data, setData] = useState(null)
    const router = useRouter()

    //输入框ref
    const inputRef = useRef(null)
    //输入框事件
    function handerClick() {
        const inputValue = inputRef.current.value.trim();
        if(inputValue)
        {
            const url = `/${encodeURIComponent(inputRef.current.value)}`
            router.push(url, url, { shallow: true })
            inputRef.current.value = ''
        }
        else
        {
            inputRef.current.focus()
        }

    }
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
                if(result.infos && result.infos.length > 0)
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
            console.log(data.infos)
            resComponent = (
                <div>
                    <div className="font-bold m-2">{router.query.city} 的天气</div>
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
        <div className="flex justify-center mt-20 h-screen text-lg">
            <div className="w-96">
                <div className="text-4xl m-4 font-bold text-center w-full">天气预报</div>
                <div className="m-4">
                    <Search keyName="q" placeholder="输入城市" searchEvent={handerClick} ref={inputRef}></Search>
                </div>
                <div className="m-4">
                    {resComponent}
                </div>
            </div>
        </div>)
}