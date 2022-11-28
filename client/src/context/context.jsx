import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const Context = createContext("grid");



export const ContextProvider = ({ children }) => {
    const [view, setView] = useState("grid");
    const [select, setSelect] = useState("");
    const [data, setData] = useState([]);
    const [search, setSearch] = useState(false)
    const [dataCache, setDataCache] = useState([]);
    const [dataOrder, setDataOrder] = useState({
        alpha: [],
        months: [],
    });


    const transform = (today, month, date) => {
        return ((today >= Number(date.split("-")[0])) && (month === Number(date.split("-")[1])))
    }

    const transform2 = (today, month, date) => {
        return ((today <= Number(date.split("-")[0])) && (month === Number(date.split("-")[1])))
    }

    const signToday = (sign) => {
        const date = new Date();
        const today = date.getDate();
        const month = date.getMonth() + 1;

        if (sign) {
            const result = sign.filter((item) => {
                if (transform(today, month, item.init_date) || transform2(today, month, item.end_date)) {
                    return item;
                }
            })
            setSelect(result[0]);
        }
    }

    const onSelectCard = (cardSelect) => {
        setSelect(cardSelect);
    }

    const onSearch = (value) => {
        if (value.target.value.length !== 0) {
            setSearch(true);
        } else {
            setSearch(false)
        }

        const aux = dataCache.filter(item => 
            item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        )
        setData(aux);
    }

    const onOrder = (type) => {
        const aux = data.sort(function (a, b) {
            let y = b.name.toLowerCase();
            let x = a.name.toLowerCase();
            if (x < y) { return type === "AZ" ? -1 : 1; }
            if (x > y) { return type === "AZ" ? 1 : -1; }
            return 0;
        });
        setDataOrder({
            ...dataOrder,
            alpha: aux,
        });
    }

    const onOrderMonth = (type) => {
        const aux = data.sort(function (a, b) {
            let y = b.init_date.split("-");
            let x = a.init_date.split("-");
            if (Number(x[1]) > Number(y[1])) { return type === "Asc" ? 1 : -1; }
            if (Number(x[1]) < Number(y[1])) { return type === "Asc" ? -1 : 1; }
            return 0;
        });
        setDataOrder({
            ...dataOrder,
            months: aux,
        });
    }

    useEffect(() => {
        async function fetchData() {
            await axios.get("http://localhost:3001/zodiac_signs", {
                headers: {
                    Authorization: 'qazwsx'
                }
            }).then(({ data }) => {
                setData(data);
                setDataCache(data);
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
            onOrder,
            signToday,
            onOrderMonth
        }}>
            {children}
        </Context.Provider>
    )
}; 