import React, { useContext, useEffect, useState } from 'react';
import Filter from '../../components/Filter';
import Grid from '../../components/Grid';
import SearchBar from '../../components/SearchBar';
import CardSelect from '../../components/Select/select';
import { Context } from "../../context/context";


const Principal = () => {

    const { data, select, search, onOrder, signToday, onOrderMonth } = useContext(Context);
    const [signos, setSignos] = useState(data);

    useEffect(() => {
        setSignos(data)
        signToday(data)
    }, [data])

    return (
        <>
            <h1 style={{ display: "flex", justifyContent: "center" }}>Horóscopo</h1>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                <Filter />
                <button type="button" onClick={() => onOrder("AZ")}>
                    A-Z
                </button>
                <button type="button" onClick={() => onOrder("ZA")}>
                    Z-A
                </button>
                <button type="button" onClick={() => onOrderMonth("Asc")}>
                    Ene-Dic
                </button>
                <button type="button" onClick={() => onOrderMonth("Desc")}>
                    Dic-Ene
                </button>
                <SearchBar />
            </div>
            <>
                {
                    (select && !search) && <CardSelect select={select} />
                }
                {
                    (search && signos.length === 1) ?
                        <CardSelect select={signos[0]} />
                        :
                        <>
                            {

                                <Grid data={signos} />

                            }
                        </>
                }
            </>
        </>
    )
}

export default Principal;