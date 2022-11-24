import React, { useContext, useState, useEffect } from 'react';
import Card from '../Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Context } from '../../context/context';

const GridContainer = ({data}) => {
    const { view, order } = useContext(Context);



    return (
        <Box sx={{ flexGrow: 1, padding: 5 }}>
            <Grid container spacing={2} sx={{ justifyContent: "center"}}>
                {
                    data && data.map((item, key) => {
                        return (
                            <Grid item xs={view === "grid" ? 8 : 12} sm={view === "grid" ? 6 : 12} md={view === "grid" ? 4 : 12} lg={view === "grid" ? 3 : 12} key={key}>
                                <Card item={item} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

export default GridContainer;
