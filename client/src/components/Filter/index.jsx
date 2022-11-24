import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Context } from "../../context/context";

const Filter = () => {
    const { view, setView } = useContext(Context);

    const handleChange = (event) => {
        setView(event.target.value)
    };

    return (
        <Box sx={{ maxWidth: 220, minWidth: 200 }}>
            <FormControl fullWidth>
                <InputLabel id="select-label">Ver</InputLabel>
                <Select
                    labelId="select-label"
                    id="simple-select"
                    value={view}
                    label="Age"
                    defaultValue='Grilla'
                    onChange={handleChange}
                >
                    <MenuItem value={"grid"}>Grilla</MenuItem>
                    <MenuItem value={"list"}>Lista</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default Filter;