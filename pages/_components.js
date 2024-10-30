import {useState} from "react";

export function Search(props)
{
    return (
        <div>
            <input className="px-3 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-md w-60"
                name={props.keyName} placeholder={props.placeholder?props.placeholder:""}
                   onKeyDown={(event)=>{
                       if (event.keyCode === 13) {
                           props.searchEvent()
                       }
                   }}
                ref={props.ref?props.ref:null}/>
            <button onClick={props.searchEvent} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
        </div>
    )
}

export function Item({title, value})
{
    return (
       <li>
           {title}: {value}℃
       </li>
    )
}

export function InfoList({infos})
{
    if(infos.length > 0)
    {
        const listItems = infos.map((info) =>
        <Item key={info.key} title={info.title} value={info.value} />
        );
        return (
            <ul>
                {listItems}
            </ul>
        )

    }
    else
    {
        return (
            <></>
        )
    }
}

