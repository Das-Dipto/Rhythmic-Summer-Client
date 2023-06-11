import React, {useContext, useEffect, useState} from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AuthContext } from '../../ContextProvider/AuthProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CheckOut = ({item}) => {
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
    const {_id, addedBy, picture, price, className, instructorName} = item;

    useEffect(() => {
        if (price > 0) {
          fetch('http://localhost:5000/create-payment-intent', {
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
              transactionId: paymentIntent.id,
              class:className,
              price,
              date: new Date(),
            };
      
            fetch('http://localhost:5000/payments', {
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
                    fetch(`http://localhost:5000/deleteSelectClass/${item._id}`,{
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