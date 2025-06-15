import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getCountryNames, registerUser } from "../../store/features/userSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
const UserRegistration = () => {
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [addresses, setAddresses] = useState([
    {
      country: "",
      state: "",
      city: "",
      street: "",
      phone: "",
      addressType: "HOME",
    },
  ]);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updateAddresses = [...addresses];
    updateAddresses[index] = {
      ...updateAddresses[index],
      [name]: value,
    };
    setAddresses(updateAddresses);
  };

  const addAddress = () => {
    setAddresses([
      ...addresses,
      {
        country: "",
        state: "",
        city: "",
        street: "",
        addressType: "HOME",
      },
    ]);
  };

  const removeAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await dispatch(getCountryNames()).unwrap();
      setCountries(response);
    };
    fetchCountries();
  }, [dispatch]);

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(
        registerUser({ user, addresses })
      ).unwrap();
      resetForm();
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message || "Registration failed");
    }
  };

  const resetForm = () => {
    setUser({ firstName: "", lastName: "", email: "", password: "" });
    setAddresses([
      {
        country: "",
        state: "",
        city: "",
        street: "",
        addressType: "HOME",
      },
    ]);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <ToastContainer />
      <Form
        className="border p-4 rounded shadow"
        style={{ width: "100%", maxWidth: "600px" }}
        onSubmit={handleRegistration}
      >
        <h3 className="mb-4 text-center">User Registration</h3>
        <Row>
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleUserChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleUserChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleUserChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            className="form-control"
            type="password"
            name="password"
            value={user.password}
            onChange={handleUserChange}
            required
          />
        </Form.Group>

        <h4 className="mt-4">Addresses</h4>

        {addresses.map((address, index) => (
          <div key={index} className="border p-3 mb-3 rounded">
            <h4>Address {index + 1}</h4>
            <Row className="mb-2">
              <Col md={4}>
                <Form.Group controlId={`country-${index}`}>
                  <Form.Label>Country:</Form.Label>
                  <Form.Control
                    as="select"
                    name="country"
                    value={address.country}
                    onChange={(e) => handleAddressChange(index, e)}
                    required
                  >
                    <option value="">Select a country</option>
                    {countries.map((country, i) => (
                      <option key={i} value={country}>
                        {country}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId={`state-${index}`}>
                  <Form.Label>State/Province:</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={(e) => handleAddressChange(index, e)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId={`city-${index}`}>
                  <Form.Label>City:</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={(e) => handleAddressChange(index, e)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId={`street-${index}`}>
              <Form.Label>Street:</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={address.street}
                onChange={(e) => handleAddressChange(index, e)}
                required
              />
            </Form.Group>
            <Row className="mt-2">
              <Col md={4}>
                <Form.Group controlId={`phone-${index}`}>
                  <Form.Label>Phone Number:</Form.Label>
                  <Form.Control
                    type="phone"
                    name="phone"
                    value={address.phone}
                    onChange={(e) => handleAddressChange(index, e)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group controlId={`addressType-${index}`}>
                  <Form.Label>Address Type:</Form.Label>
                  <Form.Control
                    as="select"
                    name="addressType"
                    value={address.addressType}
                    onChange={(e) => handleAddressChange(index, e)}
                  >
                    <option value="HOME">Home</option>
                    <option value="OFFICE">Office</option>
                    <option value="SHIPPING">Shipping</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end">
              <Button
                variant="danger"
                className="mt-2"
                onClick={() => removeAddress(index)}
                size="sm"
              >
                Remove Address
              </Button>
            </div>
          </div>
        ))}

        <div className="d-flex gap-4 mb-2 mt-2">
          <Button variant="primary" onClick={addAddress} size="sm">
            Add Address
          </Button>
          <Button variant="success" type="submit" size="sm">
            Register
          </Button>
        </div>

        <div className="text-center mt-4 mb-4">
          Have an account already?{" "}
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            Login here
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default UserRegistration;
