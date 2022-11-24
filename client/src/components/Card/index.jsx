import React, { useContext,  } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { Context } from '../../context/context';


const CardHoroscopo = ({ item }) => {
    const {
        name,
        prediction,
        image
    } = item

    const { view, onSelectCard } = useContext(Context);
    
    return (
        <div>
            <Card 
            row={view !== "grid" ? true : false}
            variant="outlined" 
            sx={{
                bgcolor: 'background.body',
                minWidth: "80%",
                minHeight: 50,
                cursor: 'pointer',
                borderWidth: 2
            }}
            onClick={() => onSelectCard(item)}
            >

                    <CardOverflow sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                        {
                            view === "grid" && <Typography fontWeight="md" textColor="success.plainColor" mb={2}>
                                {name}
                            </Typography>
                        }
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
                            minHeight: view === "grid" ? 100 : 40
                        }}
                    >
                        {
                            view !== "grid" &&
                            <Typography fontWeight="md" textColor="success.plainColor" ml={1}>
                                {name}
                            </Typography>
                        }
                        <Typography sx={{
                            maxWidth: view === "grid" ? "80%" : "100%",
                            maxHeight: 100,
                        }}
                            ml={1}
                        >
                            {
                                view === "grid"
                                    ?
                                    prediction.substring(0, (100 + prediction.substring(100, 150).indexOf(" ")))
                                    :
                                    prediction.substring(0, (150 + prediction.substring(150, 160).indexOf(" ")))

                            }
                        </Typography>
                    </CardContent>
                    <Divider />
            </Card>
        </div >
    );
}

export default CardHoroscopo;