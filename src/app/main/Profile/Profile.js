import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import React from "react";
import { useState } from 'react';
import Chart from 'react-apexcharts';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { CardActions, Card, CardMedia, CardContent,Typography,CardActionArea, Button } from '@mui/material';

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.palette.divider,
    },
}));

function ExamplePage(props) {
    const { t } = useTranslation("examplePage");

    const [state] = useState({
        options: {
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        },
        series: [
            {
                data: [30, 40, 25, 50, 49, 21, 70, 51]
            }
        ]
    });

    // Dummy data object
    const dummyData = [
        {
            propertyname: "Property 1",
            totalroom: 10,
            price: 100000,
            propertycapacity: 20,
            address1: "Address Line 1",
            address2: "Address Line 2",
            city: "City 1"
        },
        {
            propertyname: "Property 2",
            totalroom: 15,
            price: 150000,
            propertycapacity: 30,
            address1: "Address Line 3",
            address2: "Address Line 4",
            city: "City 2"
        }
    ];

    return (
        <Root
            header={
                <div className="p-24" style={{ paddingBottom: '10px' }}>
                    <h1 style={{ fontWeight: '900' }}>Profile</h1>
                </div>
            }
            content={
                <div>
                    {/* <div className="column">
                        <Chart
                            options={state.options}
                            series={state.series}
                            type="bar"
                            width="500"
                        />
                    </div>

                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Share
                            </Button>
                        </CardActions> */}
                    {/* </Card> */}

                    {/* <p>Home</p> */}
                </div>
            }
        />
    );
}

export default ExamplePage;
