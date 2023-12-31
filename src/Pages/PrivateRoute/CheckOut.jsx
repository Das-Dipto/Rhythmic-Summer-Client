import React, {useContext, useEffect, useState} from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AuthContext } from '../../ContextProvider/AuthProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../Hooks/useTitle';

const CheckOut = ({item}) => {
    useTitle('CheckOut')
    const [Data, setData] = useState();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const notify = () => toast.success("Payment Completed", {autoClose: 700, theme: "colored"});
    // console.log(item);
    const {_id, addedBy, picture, price, className, instructorName,  instructorEmail} = item;


    const ext =(dt) =>{
      fetch(` https://server-a12.vercel.app/updateSeats?email=${dt?.instructorEmail}&className=${dt?.className}`)
      .then((res)=>res.json())
      .then((data)=>{
         setData(data)
         console.log(data.seats, typeof data.seats)
         const updatedSeats = data.seats - 1;
         const updatedEnrollment = data.enrollment + 1;
        console.log(updatedSeats, updatedEnrollment);
         const updatedItem = {
              updatedSeats,
              updatedEnrollment
         } 
         console.log(updatedItem)

         fetch(` https://server-a12.vercel.app/updatedOnly/${data._id}`,{
           method:'PUT',
           headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedItem),
         })
         .then((res)=>res.json())
         .then((data)=>console.log(data))
         .catch((err)=>console.log(err.message))
        })

      .catch((err)=>console.log(err.message))
    }
   
   
    useEffect(() => {
        if (price > 0) {
          fetch(' https://server-a12.vercel.app/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ price }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to fetch client secret');
              }
              return response.json();
            })
            .then((data) => {
              console.log(data.clientSecret);
              setClientSecret(data.clientSecret);
              console.log(clientSecret);
            })
            .catch((error) => {
              console.error('Fetch client secret error:', error);
              // Handle error state
            });
        }
      }, []);
    

      const handleSubmit = async (event) => {
        event.preventDefault();
      
        if (!stripe || !elements) {
          return;
        }
      
        const card = elements.getElement(CardElement);
        if (card === null) {
          return;
        }
      
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
      
        if (paymentMethodError) {
          console.log('Payment method error:', paymentMethodError);
          setCardError(paymentMethodError.message);
          return;
        } else {
          setCardError('');
        }
      
        setProcessing(true);
      
        try {
          const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card,
                billing_details: {
                  email: user?.email || 'unknown',
                  name: user?.displayName || 'anonymous',
                },
              },
            }
          );
      
          if (confirmError) {
            console.log('Payment confirmation error:', confirmError);
          }
      
          console.log('Payment intent:', paymentIntent);
          setProcessing(false);
      
          if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
      
            const paymentInfo = {
              payee: user?.displayName,
              email: user?.email,
              instructorEmail,
              transactionId: paymentIntent.id,
              class:className,
              price,
              date: new Date(),
            };
      
            fetch(' https://server-a12.vercel.app/payments', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(paymentInfo),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Failed to post payment');
                }
                return response.json();
              })
              .then((data) => {
                console.log(data);
                if (data.insertedId) {
                    console.log('successful')
                    notify();
                    ext(item)
                    fetch(` https://server-a12.vercel.app/deleteSelectClass/${item._id}`,{
                       method:"DELETE"
                    })
                    .then((res)=>res.json())
                    .then((data)=>console.log(data))
                    .error((err)=>console.log(err.message))

                   
                    
                  // Display confirmation message
                }
              })
              .catch((error) => {
                console.error('Post payment error:', error);
                // Handle error state
              });
          }
        } catch (error) {
          console.error('Confirm card payment error:', error);
          // Handle error state
        }
      };

  return (
    <>
        <form className="w-2/3 m-8" onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-neutral btn-sm mt-4" type="submit" disabled={!stripe || !clientSecret || processing}>
                Pay
            </button>
        </form>
        {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
        {transactionId && <p className="text-green-500">Transaction complete with transactionId: {transactionId}</p>}
        <ToastContainer/>
   </>
  )
}

export default CheckOut