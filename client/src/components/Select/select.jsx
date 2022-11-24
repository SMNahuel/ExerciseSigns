import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';


const CardSelect = ({ select }) => {
    const {
        name,
        prediction,
        image
    } = select

    return (
            <Card
                row
                variant="outlined" sx={{
                    bgcolor: 'background.body',
                    minWidth: "80%",
                    minHeight: 50,
                    borderWidth: 5,
                    padding: 5,
                    marginLeft: 5,
                    marginRight: 5,
                }}
            >

                <CardOverflow sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>

                    <AspectRatio ratio="1" sx={{ width: 80, height: 100, display: 'flex', justifyContent: 'center', borderBottomRightRadius: 100 }} >
                        <img
                            src={`http://localhost:3001/${image}`}
                            loading="lazy"
                            alt=""
                        />
                    </AspectRatio>
                </CardOverflow>
                <CardContent
                    sx={{
                        bgcolor: 'background.body',
                        minWidth: "90%",
                        minHeight: "100%"
                    }}
                >
                    <Typography fontWeight="md" ml={1} textColor="success.plainColor" mb={2}>
                        {name}
                    </Typography>
        
                    <Typography sx={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                    }}
                        ml={1}
                    >
                        {
                            prediction
                        }
                    </Typography>
                </CardContent>
                <Divider />
            </Card>
    );
}

export default CardSelect;