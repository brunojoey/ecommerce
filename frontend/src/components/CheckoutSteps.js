import React from 'react';
import {Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {/* if Step 1 has been passed in by a prop */}
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : <Nav.Link disabled>Sign In</Nav.Link>}
      </Nav.Item>
      <Nav.Item>
        {/* if Step 2 has been passed in by a prop */}
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : <Nav.Link disabled>Shipping</Nav.Link>}
      </Nav.Item>
      <Nav.Item>
        {/* if Step 3 has been passed in by a prop */}
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : <Nav.Link disabled>Payment</Nav.Link>}
      </Nav.Item>
      <Nav.Item>
        {/* if Step 4 has been passed in by a prop */}
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : <Nav.Link disabled>Place Order</Nav.Link>}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
