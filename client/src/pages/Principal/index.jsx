import React, { useContext, useEffect, useState } from 'react';
import Filter from '../../components/Filter';
import Grid from '../../components/Grid';
import SearchBar from '../../components/SearchBar';
import CardSelect from '../../components/Select/select';
import { Context } from "../../context/context";
import Button from '@mui/material/Button';

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
                <Button variant="contained" onClick={() => onOrder("AZ")}>
                    A-Z
                </Button>
                <Button variant="contained" onClick={() => onOrder("ZA")}>
                    Z-A
                </Button>
                <Button variant="contained" onClick={() => onOrderMonth("Asc")}>
                    Ene-Dic
                </Button>
                <Button variant="contained" onClick={() => onOrderMonth("Desc")}>
                    Dic-Ene
                </Button>
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