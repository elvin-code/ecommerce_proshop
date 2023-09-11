import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'


function PaymentScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch('')

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [ paymentMethod, setPaymentMethod ] = useState('PayPal')

    if(!shippingAddress.address){
        navigate('/shipping')
    }

    const sumbitHanlder = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 stap3 />

        <Form onSubmit={sumbitHanlder}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='paypal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>
                </Col>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen
