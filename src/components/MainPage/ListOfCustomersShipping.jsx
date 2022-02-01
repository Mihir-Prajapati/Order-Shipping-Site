import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, InputBase, IconButton, Badge, MenuItem, Menu, Typography, Button, Grid } from '@material-ui/core';
import useStyle from './styles';
import CustomerCard from './CustomersCard';



const ListOfCustomersShipping = ({ orders, customers, filter }) => {
    const classes = useStyle();


    return (
        <Grid container spacing={2} className={classes.grid}>
                {orders.map((o) => {
                  return (
                    o.city.includes(filter) ?
                    <>
                      {customers.map((c) => {
                        return (
                          o.customerId == c.id ?
                          <Grid item lg={4}>
                            <CustomerCard order={o} customer={c}/>
                          </Grid>
                            : ''
                        );
                      })}
                    </> : <></>
                  );
                })}
            </Grid>

    );
};

export default ListOfCustomersShipping;