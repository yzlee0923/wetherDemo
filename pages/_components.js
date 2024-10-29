import {useState} from "react";

export function Search(props)
{
    const [kw, setKw] = useState('')
    return (
        <div>
            <input name={props.name} placeholder={props.placeholder?.props.placeholder} value={kw}/>
            <button onClick={props.search}>Search</button>
        </div>
    )
}

export function Item({title, value})
{
    return (
       <li>
           {title}: {value}
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

