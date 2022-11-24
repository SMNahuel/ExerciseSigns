import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const Context = createContext("grid");



export const ContextProvider = ({ children }) => {
    const [view, setView] = useState("grid");
    const [select, setSelect] = useState("");
    const [data, setData] = useState([]);
    const [search, setSearch] = useState(false)
    const [dataCache, setDataCache] = useState([]);
    const [order, setOrder] = useState({
        active: false,
        type: null
    });

    const transform = (today, month, date) => {
        return ((today >= Number(date.split("-")[0])) && (month === Number(date.split("-")[1])))
    }

    const transform2 = (today, month, date) => {
        return ((today <= Number(date.split("-")[0])) && (month === Number(date.split("-")[1])))
    }

    const signToday = (sign) => {
        const date = new Date;

        const today = date.getDate();
        const month = date.getMonth() + 1;

        sign && sign.map((item) => {
            if (transform(today, month, item.init_date) || transform2(today, month, item.end_date)) {
                setSelect(item);
            }
        })
    }

    const onSelectCard = (cardSelect) => {
        setSelect(cardSelect);
        const aux = dataCache.filter(item => item.id !== cardSelect.id)
        setData(aux);
    }

    const onSearch = (value) => {
        if (value.target.value.length !== 0) {
            setSearch(true);
        } else {
            setSearch(false)
        }

        const aux = dataCache.filter(item => item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value.target.value))
        setData(aux);
    }

    const sortData = (type) => {
        setOrder({...order, active: true, order: type});
    }

    useEffect(() => {
        async function fetchData() {
            await axios.get("http://localhost:3001/zodiac_signs", {
                headers: {
                    Authorization: 'qazwsx'
                }
            }).then(({ data }) => {
                signToday(data)
                setData(data);
                setDataCache(data)
            }).then(() => {
            })
        }
        fetchData();
    }, [])


    return (
        <Context.Provider value={{
            view,
            setView,
            data,
            select,
            onSelectCard,
            onSearch,
            search,
            sortData,
            order
        }}>
            {children}
        </Context.Provider>
    )
}; 