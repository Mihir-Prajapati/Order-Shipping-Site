import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { Checkbox } from '@material-ui/core'

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
  }
})

const CreatePurchaseOrder = ({ customers }) => {
  const classes = useStyles();
  const [productName, setproductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [customerId, setCustomerId] = useState('');

  const [productNameError, setProductNameError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [mrpError, setMrpError] = useState(false);
  const [customerIdError, setCustomerIdError] = useState(false);

//   const categoryListRef = collection(db, "Categories");
  const ordersListRef = collection(db, "orders");

  
//   const [products, setProducts] = useState([]);
//   const [customers, setCustomers] = useState([]);

  const createOrder = async () => {
    await addDoc(ordersListRef, { name: productName, quantity: Number(quantity), price: Number(price), mrp: Number(mrp), customerId: customerId });
  };

  const handleSubmit = (e) => {
    // Avoiding refresh on submit
    e.preventDefault();
    setProductNameError(false);
    setQuantityError(false);
    setPriceError(false);
    setMrpError(false);
    setCustomerIdError(false) 

    if (productName == '') {
      setProductNameError(true)
    }
    if (quantity == '') {
        setQuantityError(true)
    }
    if (price == '' || Number(price) > Number(mrp)) {
      setPriceError(true)
    }
    if (mrp == ''){
        setMrpError(true)
    }
    // if(Number(price) > Number(mrp)){
    //     console.log("price= ", price, " mrp= ", mrp);
    //     console.log( 9 > 12);
    //     setPriceError(true);
    // }
    if (customerId == ''){
        setCustomerIdError(true);
    }
    else{
      console.log(productName, quantity, price, mrp, customerId);
        createOrder();
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
        Purchase Orders
      </Typography>
      
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField className={classes.field}
          onChange={(e) => setproductName(e.target.value)}
          label="Product Name" 
          variant="outlined" 
          color="secondary" 
          fullWidth
          required
          error={productNameError}
        />
        <TextField className={classes.field}
            onChange={(e) => setQuantity(e.target.value)}
            label="Quantity"
            type="number"
            variant="outlined" 
            color="secondary" 
            fullWidth
            required
            error={quantityError}
        />
        <TextField className={classes.field}
            onChange={(e) => setPrice(e.target.value)}
            label="Price"
            type="number"
            variant="outlined" 
            color="secondary" 
            fullWidth
            required
            error={priceError}
        />
        <TextField className={classes.field}
            onChange={(e) => setMrp(e.target.value)}
            label="MRP"
            variant="outlined" 
            color="secondary" 
            fullWidth
            required
            error={mrpError}
        />
        <TextField className={classes.field}
            onChange={(e) => setCustomerId(e.target.value)}
            label="Customer Id"
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

export default CreatePurchaseOrder;