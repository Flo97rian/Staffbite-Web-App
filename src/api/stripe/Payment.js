import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useSelector } from "react-redux";
import { API_HOSTNAME } from "../../constants/ApiConstants";
import { API, Auth } from "aws-amplify";
import PropTypes from 'prop-types';
import * as _ from "lodash"


function Payment({EmployeesLength}) {
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');
  let [sessionURL, setSessionURL] = useState("");
  let [stripe, setStripe] = useState(false);
  let [options, setOptions] = useState(false);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

  useEffect(() => {
    if( !_.isEmpty(sessionURL)) {
      window.open(sessionURL);
    }
  },[sessionURL])

  async function handleCreateCheckoutSession(priceID) {
    console.log("create");
    let response;
    let user = await Auth.currentAuthenticatedUser()
    console.log(user);
    if(_.hasIn(user, "attributes.email")) {
      const email = user.attributes.email;
      response = await API.post(API_HOSTNAME, "/stripeCheckout", {body: {priceID: priceID, MitarbeiterAnzahl: EmployeesLength, email: email}})
    }
    console.log(response);
    setSessionURL(response?.session?.url);
  }
  
  const ProductDisplay = () => (
    <>
      <h3 className='staffbite-display-4'>Wähle einen Plan aus</h3>
    <div className='payment-body'>
    <section className='payment-section'>
      <div className="payment-product">
        <div className="payment-description">
          <h3 className='lead'>Monatliches Abo</h3>
          <p></p>
        </div>
      </div>
        {/* Add a hidden field with the lookup_key of your Price */}
        <button className="payment-button" id="checkout-and-portal-button" onClick={() => handleCreateCheckoutSession("price_1Kvk47AQ7Ygg2HBE4FrxOYXY")}>
          <p>
            Zur Übersicht
          </p>
        </button>
    </section>
    <section className='px-4'>
    </section>
    <section className='payment-section'>
      <div className="payment-product">
        <div className="payment-description">
          <h3 className='lead'>Järhliches Abo</h3>
        </div>
      </div>
        <button className="payment-button" id="checkout-and-portal-button" onClick={() => handleCreateCheckoutSession("price_1KvkQKAQ7Ygg2HBEsBKs5Uuf")}>
          <p>
            Zur Übersicht
          </p>
        </button>
    </section>
    </div>
    </>
  );
  
  const SuccessDisplay = ({ sessionId }) => {
    return (
      <section>
        <div className="payment-product Box-root">
          <Logo />
          <div className="payment-description Box-root">
            <h3>Subscription to starter plan successful!</h3>
          </div>
        </div>
        <form action="/create-portal-session" method="POST">
          <input
            type="hidden"
            id="session-id"
            name="session_id"
            value={sessionId}
          />
          <button id="checkout-and-portal-button" type="submit">
            Manage your billing information
          </button>
        </form>
      </section>
    );
  };

  if (!success && message === '') {
    return (
          <ProductDisplay/>
        );
  } else if (success && sessionId !== '') {
    return <SuccessDisplay sessionId={sessionId} />;
  } else {
    return null;
  }
}

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="14px"
    height="16px"
    viewBox="0 0 14 16"
    version="1.1"
  >
    <defs />
    <g id="Flow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="0-Default"
        transform="translate(-121.000000, -40.000000)"
        fill="#E184DF"
      >
        <path
          d="M127,50 L126,50 C123.238576,50 121,47.7614237 121,45 C121,42.2385763 123.238576,40 126,40 L135,40 L135,56 L133,56 L133,42 L129,42 L129,56 L127,56 L127,50 Z M127,48 L127,42 L126,42 C124.343146,42 123,43.3431458 123,45 C123,46.6568542 124.343146,48 126,48 L127,48 Z"
          id="Pilcrow"
        />
      </g>
    </g>
  </svg>
);
// Specifies the default values for props:
Payment.defaultProps = {
  EmployeesLength: 0
};
Payment.propTypes = {
  Employees: PropTypes.number.isRequired
}

export default Payment;
