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


const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  formContainer: {
      width: 700,
  }
})

export default function CreateNewCustomer() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [city, setCity] = useState('');


  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [cityError, setCityError] = useState(false);

//   const categoryListRef = collection(db, "Categories");
  const customerListRef = collection(db, "customers");

  
//   const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const createCustomer = async () => {
    await addDoc(customerListRef, { name: name, email: email, mobile: Number(mobile), city: city });
  };

  const handleSubmit = (e) => {
    // Avoiding refresh on submit
    e.preventDefault();
    setNameError(false);
    setEmailError(false);
    setMobileError(false);
    setCityError(false);
    // setCategoriesError(false) 

    if (name == '') {
      setNameError(true)
    }
    else if (email == '' || !email.includes('@') || !email.includes('.com') ) {
        setEmailError(true)
    }
    else if (mobile == '' || mobile.length < 9) {
      setMobileError(true)
    }
    else if (city == ''){
        setCityError(true)
    }
    else{
        console.log(name, email, mobile, city);
        createCustomer();
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
        Add a new Customer
      </Typography>
      
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField className={classes.field}
          onChange={(e) => setName(e.target.value)}
          label="Name" 
          variant="outlined" 
          color="secondary" 
          fullWidth
          required
          error={nameError}
        />
        <TextField className={classes.field}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            type="email"
            variant="outlined" 
            color="secondary" 
            fullWidth
            required
            error={emailError}
        />
        <TextField className={classes.field}
            onChange={(e) => setMobile(e.target.value)}
            label="Mobile Number"
            type="phone"
            variant="outlined" 
            color="secondary" 
            fullWidth
            required
            error={mobileError}
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
}