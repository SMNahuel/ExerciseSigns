import React, { useContext } from 'react';
import Filter from '../../components/Filter';
import Grid from '../../components/Grid';
import SearchBar from '../../components/SearchBar';
import CardSelect from '../../components/Select/select';
import { Context } from "../../context/context";


const Principal = () => {

    const { data, select, search, sortData } = useContext(Context);

    return (
        <>
            <h1 style={{ display: "flex", justifyContent: "center" }}>Horóscopo</h1>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                <Filter />
                <SearchBar />
            </div>
            <>
                {
                    select && !search && <CardSelect select={select} />
                }
                {
                    data && data.length > 1 && <Grid data={data}/>
                }
                {
                    search && data.length === 1 && <CardSelect select={data[0]} />
                }
            </>
        </>
    )
}

export default Principal;