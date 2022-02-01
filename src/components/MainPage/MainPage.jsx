import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, InputBase, IconButton, Badge, MenuItem, Menu, Typography, Button, Grid } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import useStyle from './styles';
import { Autocomplete } from '@material-ui/lab';
import { db } from '../../firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';


import CustomerCard from './CustomersCard';
import useStyles from './styles';
import ListOfCustomersShipping from './ListOfCustomersShipping';
import ListOfPurchaseOrders from './ListOfPurchaseOrders';


const MainPage = ({ customers }) => {
    const classes = useStyle();
    
    const [filter, setFilter] = useState('');
    let history = useHistory();

    const [orders, setOrders] = useState([]);
    const ordersCollectionRef = collection(db, "shipping-details");

    useEffect(() => {
      const getOrders = async () => {
          const ordersData = await getDocs(ordersCollectionRef);
          setOrders(ordersData.docs.map((doc) => ({...doc.data(), id: doc.id }))); 
      }
      getOrders();
  }, []);



    const handleSearchChange = (e) => {
        setFilter(e.target.value.toLowerCase());
    };

    return (
        <div className={classes.AppBar, classes.bgImage}>
          <br></br>
            <Toolbar className={classes.toolbar} >
                <div className={classes.search}>
                    <div className={classes.searchIcon} >
                        <SearchIcon />
                    </div>
                    <InputBase placeholder="Search..." onChange={handleSearchChange} classes={{ root: classes.inputRoot, input: classes.inputInput}}/>
                </div>       
            </Toolbar>
              <Route path="/ListOfCustomersShipping">
                <ListOfCustomersShipping orders={orders} customers={customers} filter={filter}/>
              </Route>
              {/* <Route path="/ListOfPurchaseOrders">
                <ListOfPurchaseOrders />
              </Route> */}
        </div>
    );
};

export default MainPage;