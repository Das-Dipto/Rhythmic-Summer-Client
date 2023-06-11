import React, { useEffect, useContext, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from '../PrivateRoute/CheckOut'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../ContextProvider/AuthProvider'

// TODO: provide publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
const Payment = () => {
  const [item, setItem] = useState();
  const {user} = useContext(AuthContext)
  const params = useParams();
  // console.log(params);
  useEffect(()=>{
    fetch(`http://localhost:5000/payClass/${params.id}`)
    .then((res)=>res.json())
    .then((data)=> setItem(data))
    .catch((err)=> console.log(err.message))
  },[])

  return (
  item &&  <div>
       <Elements stripe={stripePromise}>
           <CheckOut item={item}></CheckOut>
       </Elements>
    </div>
  )
}

export default Payment