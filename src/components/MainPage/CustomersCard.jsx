import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Chip } from '@material-ui/core';
// import { AddShoppingCart } from '@material-ui/icons';

import useStyle from './styles';
// import { CallMissedSharp } from '@material-ui/icons';

const CustomerCard = ({order, customer}) => {
    const classes = useStyle();
    console.log("Customer Name: ", order);
    
    return (
        <div>
        <Card className={classes.root}>
            {/* <CardMedia className={classes.media} title={order.city} /> */}
            <CardContent>
                <div className={classes.CardContent}>
                    <Typography variant='h6'>
                        Name: {customer.name}
                    </Typography>
                    <Typography variant='h6'>
                        Email: {customer.email}
                    </Typography>
                    <Typography variant='h6'>
                        Mobile no: {customer.mobile}
                    </Typography>
                    <Typography variant='h6'>
                        City: {order.city}
                    </Typography>
                    <div>
                        <Typography variant='h6'>Shipping ID:
                            <Chip key={order.id} size="small" label= {order.id} className={classes.chip} />
                        </Typography> 
                    </div>
                </div>
            </CardContent>
        </Card>
        </div>
    );
};

export default CustomerCard;