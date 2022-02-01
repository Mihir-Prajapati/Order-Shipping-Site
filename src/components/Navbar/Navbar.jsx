import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Button } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../images/logo512.png';
import useStyles from './styles';
import { useHistory } from "react-router-dom";

const Navbar = () => {
    const classes = useStyles();
    let history = useHistory();

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit" >
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit" onClick={() => history.push('/')} >
                        <img src={logo} alt="e-commerce.js" height="25px" className={classes.image} /> E-Commerce-Lite
                    </Typography>
                    <Typography variant='h6' onClick={() => history.push('/AddNewCustomer')} className={classes.title} color="inherit">
                        <Button >Add New Customer</Button>
                    </Typography>
                    <Typography variant='h6' onClick={() => history.push('/PurchaseOrder')} className={classes.title} color="inherit">
                        <Button >Purchase Order</Button>
                    </Typography>
                    <Typography variant='h6' onClick={() => history.push('/ShippingDetails')} className={classes.title} color="inherit">
                        <Button >Shipping Details</Button>
                    </Typography>
                    <Typography variant='h6' className={classes.title} color="inherit">
                        <Button 
                        onClick={() => history.push('/ListOfPurchaseOrders')}
                        >Get Customers Purchase Orders</Button>
                    </Typography>
                    <Typography variant="h6" className={classes.subtitle} color="inherit" >
                        <Button 
                        onClick={() => history.push('/ListOfCustomersShipping')}
                        >
                        List of all the Customers Shippings
                        </Button>
                    </Typography>    
                </Toolbar>
            </AppBar>
        
        </>
    );

};

export default Navbar;
