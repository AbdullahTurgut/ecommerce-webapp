import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserCart } from "../../store/features/cartSlice";
import {
  placeOrders,
  createPaymentIntent,
} from "../../store/features/orderSlice";
import { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify";
import { Card, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import AddressForm from "../common/AddressForm";
import { cardElementOptions } from "../utils/cardElementOptions";
import { ClipLoader } from "react-spinners";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { userId } = useParams();

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress({ ...billingAddress, [name]: value });
  };

  useEffect(() => {
    dispatch(getUserCart(userId));
  }, [dispatch, userId]);

  const handlePaymentAndOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Check stripe presence
    if (!stripe || !elements) {
      toast.error("Loading..., please try again");
      return;
    }
    const cardElement = elements.getElement(CardElement);
    // 2. Create the paymentIntent  through the backend
    try {
      const { clientSecret } = await dispatch(
        createPaymentIntent({ amount: cart.totalAmount, currency: "usd" })
      ).unwrap();

      // 3. Confirm the payment intent with the card details
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${userInfo.firstName} ${userInfo.lastName}`,
              email: userInfo.email,
              address: {
                line1: billingAddress.street,
                city: billingAddress.city,
                state: billingAddress.state,
                country: billingAddress.country,
              },
            },
          },
        }
      );

      // 4. Place the order after successful payment
      if (error) {
        toast.error(error.message);
      }
      if (paymentIntent.status === "succeeded") {
        // Step 3. Place the order after successful payment
        await dispatch(placeOrders(userId)).unwrap();
        toast.success("Payment successful! Your order has been placed");
        setTimeout(() => {
          window.location.href = `/user-profile/${userId}/profile`;
          //  navigate(`/user-profile/${userId}/profile`); use code block above there cause of clear the url
        }, 5000);
      }
    } catch (error) {
      toast.error("Error processing payment: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <ToastContainer />
      <div className="d-flex justify-content-center">
        <Row>
          <Col md={8}>
            <Form className="p-4 border rounded shadow-sm">
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="firstName"
                      name="firstName"
                      value={userInfo.firstName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="lastName"
                      name="lastName"
                      value={userInfo.lastName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <FormGroup>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control mb-2"
                  id="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                ></input>
              </FormGroup>

              <div>
                <h6>Enter Billing Address</h6>
                <AddressForm
                  onChange={handleAddressChange}
                  address={billingAddress}
                  showAddressType={false}
                />
              </div>

              <div className="form-group mb-2">
                <label htmlFor="card-element" className="form-label">
                  <h6>Credit or Debit Card</h6>
                </label>
                <div id="card-element" className="form-control">
                  <CardElement
                    options={cardElementOptions}
                    onChange={(e) => {
                      setCardError(e.error ? e.error.message : "");
                    }}
                  />
                  {cardError && <div className="text-danger">{cardError}</div>}
                </div>
              </div>
            </Form>
          </Col>
          <Col md={4}>
            <h6 className="mt-4 text-center cart-title">Your Order Summary</h6>
            <hr />
            <Card style={{ backgroundColor: "whitesmoke" }}>
              <Card.Body>
                <Card.Title className="mb-2 text-muted text-success">
                  Total Amount : ${cart?.totalAmount.toFixed(2)}
                </Card.Title>
              </Card.Body>
              <button
                type="submit"
                className="btn btn-warning mt-3"
                disabled={!stripe}
                onClick={(e) => handlePaymentAndOrder(e)}
              >
                {loading ? (
                  <ClipLoader size={20} color={"#123abc"} />
                ) : (
                  "Pay Now"
                )}
              </button>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Checkout;
