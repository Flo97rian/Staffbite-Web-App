import React, { useState, useEffect } from 'react';
import './Payment.css';
import { API_HOSTNAME } from "../../constants/ApiConstants";
import { API, Auth } from "aws-amplify";
import * as _ from "lodash"
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';


function Payment({EmployeesLength, trialEnd}) {
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');
  let [sessionURL, setSessionURL] = useState("");

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

  async function handleCreateCheckoutSession(isYearly) {
    console.log("create");
    let response;
    let user = await Auth.currentAuthenticatedUser()
    if(_.hasIn(user, "attributes.email")) {
      const email = user.attributes.email;
      response = await API.post(API_HOSTNAME, "/stripeCheckout", {body: {email: email, isYearly: isYearly}})
    }
    setSessionURL(response?.session?.url);
  }
  
  const ProductDisplay = () => (
    <Col>
      <Row className='text-center'>
        <Col>
          <Row className='text-center'>
            <Col>
              <h3 className='staffbite-display-4'>{trialEnd ? "Dein Probemonat ist ausgelaufen" : "Dein Probemonat läuft bald aus"}</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                Wähle eine Zahlungsmethode aus.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col>
          <h3 className=''>Monatliche Zahlung</h3>
        </Col>
        <Col>
          <h3 className=''>Jährliche Zahlung</h3>
        </Col>
      </Row>
      <Row className='text-center'>
        <Col className='card p-0 m-2'>
              <div className="payment-description">
                <Row>
                  <Col>
                    <p className='mt-2'>
                      Voraussichtlicher Preis
                    </p>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col>
                    <h3 className='m-0'>
                      {EmployeesLength > 25 ? (74.90).toLocaleString("de", {style: "currency", currency: "EUR"}) : (9.90 + 2.50 * EmployeesLength).toLocaleString("de", {style: "currency", currency: "EUR"})}
                    </h3>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col>
                    <p>
                      pro Monat*
                    </p>
                  </Col>
                </Row>
                <Row className='mb-2 mt-2'>
                  <Col>
                    <small>Abhängig von der Teamgröße***</small>
                  </Col>
                </Row>
            </div>
              {/* Add a hidden field with the lookup_key of your Price */}
              <button className="payment-button pt-1" id="checkout-and-portal-button" onClick={() => handleCreateCheckoutSession(false)}>
                <p>
                  Zahlungsmittel auswählen
                </p>
              </button>
      </Col>
      <Col className='card p-0 m-2'>
            <div className="payment-description">
              <Row className='mt-2'>
                <Col>
                  <p>
                    Ab 26 Mitarbeiter
                  </p>
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col>
                  <h3>
                    898,80 €
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    pro Jahr**
                  </p>
                </Col>
              </Row>
              <Row className='mb-2 mt-2'>
                  <Col>
                  <small>
                    10% sparen
                    Code: Staffbite10
                  </small>
                  </Col>
              </Row>
            </div>
            <button className="payment-button pt-1" id="checkout-and-portal-button" onClick={() => handleCreateCheckoutSession(true)}>
              <p>
                Zahlungsmittel auswählen
              </p>
            </button>
      </Col>
    </Row>
    <Row>
      <Col>
        <small className='text-default'>
          * Bei monatlicher Zahlung wird die Rechnung zu Beginn des Folgemonats gestellt.
        </small>
      </Col>
    </Row>
    <Row>
      <Col>
        <small className='text-default'>
          ** Bei jährlicher Zahlung wird der Rechnungbetrag sofort fällig.
        </small>
      </Col>
    </Row>
    <Row>
      <Col>
        <small className='text-default'>
         *** Dieser Preis gilt für eine Teamgröße von {EmployeesLength} Mitarbeitern. <Link to="/pricing" className='text-primary'>Weitere Informationen</Link>
        </small>
      </Col>
    </Row>
    </Col>
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

export default Payment;
