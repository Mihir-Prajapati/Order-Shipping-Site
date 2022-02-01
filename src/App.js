import './App.css';
import { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import AddNewCustomer from './components/AddNewCustomer/AddNewCustomer';
import MainPage from './components/MainPage/MainPage';
import PurchaseOrder from './components/PurchaseOrder/PurchaseOrder';
import ShippingDetails from './components/ShippingDetails/ShippingDetails';



function App() {
  const [ customers, setCustomers ] = useState([]);
  const customersCollectionRef = collection(db, "customers");

  useEffect(() => {
    const getCustomers = async () => {
      const data = await getDocs(customersCollectionRef);
      setCustomers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
      // console.log()
    }   
    getCustomers();
  }, []);




  return (
    <Router>
      <div className="App">
        <Navbar />
        <br></br>
        <br></br>
        <Switch>  
          <Route path="/AddNewCustomer" >
            <AddNewCustomer />
          </Route>
          <Route path="/PurchaseOrder" >
            <PurchaseOrder customers={customers} />
          </Route>
          <Route path="/ShippingDetails" >
            <ShippingDetails customers={customers} />
          </Route>
          <Route path="/" >
            <MainPage customers={customers}/>
            
          </Route>

        </Switch>
    </div>
    </Router>
  );
}

export default App;
