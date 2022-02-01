import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'

import { db } from '../../firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { MenuItem } from '@material-ui/core'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
    textAlign: 'left',
  },
  formContainer: {
      width: 700,
  },
})

const CreateShippingDetails = ({ customers }) => {
    const classes = useStyles();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [orderId, setOrderId] = useState('');
    // const [ordersList, setOrdersList] = useState([]);


    const [addressError, setAddressError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [pincodeError, setPincodeError] = useState(false);
    const [customerIdError, setCustomerIdError] = useState(false);
    const [orderIdError, setOrderIdError] = useState(false);

    const [orders, setOrders] = useState([]);
    const ordersCollectionRef = collection(db, "orders");

    useEffect(() => {
        const getOrders = async () => {
            const ordersData = await getDocs(ordersCollectionRef);
            setOrders(ordersData.docs.map((doc) => ({...doc.data(), id: doc.id }))); 
        }
        getOrders();
    }, []);

    const shippingDetailsRef = collection(db, "shipping-details");

    const createShipping = async () => {
        await addDoc(shippingDetailsRef, { address: address, city: city.toLowerCase(), pincode: Number(pincode), customerId: customerId, orderId: orderId });
  };

  const handleSubmit = (e) => {
    // Avoiding refresh on submit
    e.preventDefault();
    setAddressError(false);
    setCityError(false);
    setPincodeError(false);
    setCustomerIdError(false) 
    setOrderIdError(false);

    if (address == '') {
      setAddressError(true)
    }
    if (city == '') {
        setCityError(true)
    }
    if (pincode == '') {
      setPincodeError(true)
    }
    if (customerId == ''){
        setCustomerIdError(true)
    }
    if (orderId == ''){
        setOrderIdError(true)
    }
    else{
        console.log(address, city, pincode, customerId, orderId);
        createShipping();
    }
    
  }

  return (
    <Container size="sm" className={classes.formContainer}>
        <br></br>
        <br></br>
      <Typography
        variant="h6" 
        fullWidth="100px"
        color="textSecondary"
        component="h2"  
        gutterBottom
      >
        Shipping Details
      </Typography>
      
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField className={classes.field}
          onChange={(e) => setAddress(e.target.value)}
          label="Shipping Address" 
          variant="outlined" 
          color="secondary" 
          fullWidth
          required
          error={addressError}
        />
        <TextField className={classes.field}
            onChange={(e) => setCity(e.target.value)}
            label="City"
            variant="outlined" 
            color="secondary" 
            fullWidth
            required
            error={cityError}
        />
        <TextField className={classes.field}
            onChange={(e) => setPincode(e.target.value)}
            label="Pincode"
            type="number"
            variant="outlined" 
            color="secondary" 
            fullWidth
            required
            error={pincodeError}
        />
        <TextField className={classes.field}
            onChange={(e) => setCustomerId(e.target.value)}
            label="Customer Name"
            variant="outlined" 
            color="secondary" 
            select
            fullWidth
            required
            error={customerIdError}
        >
            {
                customers.map((c) => {
                    return (
                        <MenuItem value={c.id}>{c.name}</MenuItem>
                    );
                })
            }
        </TextField>

        <TextField className={classes.field}
            onChange={(e) => setOrderId(e.target.value)}
            label="Customer's  Ordered Product Name"
            variant="outlined" 
            color="secondary" 
            select
            fullWidth
            required
            error={orderIdError}
        >
            {
                orders.map((o) => {
                    return (
                        customerId == o.customerId ?  <MenuItem value={o.id}>{o.name}</MenuItem> : <></>
                    );
                })
            }
        </TextField>

        <Button
          type="submit" 
          color="secondary" 
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      </form>

      
    </Container>
  )
};

export default CreateShippingDetails;