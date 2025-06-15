import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  getUserAddresses,
  deleteUserAddress,
  updateUserAddress,
} from "../../store/features/userProfileSlice";
import {
  Button,
  Card,
  Col,
  Row,
  Container,
  Modal,
  Form,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
const UserProfile = () => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const { userProfile, addresses } = useSelector((state) => state.userProfile);
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    street: "",
    phone: "",
    addressType: "",
  });

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
      dispatch(getUserAddresses(userId));
    }
  }, [dispatch, userId]);

  const handleDeleteUserAddress = async (addressId) => {
    try {
      const result = await dispatch(deleteUserAddress(addressId)).unwrap();
      toast.success(result.message);
      dispatch(getUserAddresses(userId));
    } catch (error) {
      toast.error(error.message || "Failed to delete address.");
    }
  };

  const handleEditClick = (address) => {
    setSelectedAddress(address);
    setFormData(address);
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateAddress = async () => {
    try {
      await dispatch(
        updateUserAddress({
          id: selectedAddress.id,
          addressData: formData,
        })
      ).unwrap();
      toast.success("Address updated successfully");
      dispatch(getUserAddresses(userId));
      setShowModal(false);
    } catch (error) {
      toast.error(error.message || "Update failed");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-2 mb-2">
      <ToastContainer />
      <Row className="p-4 rounded" style={{ width: "100%", maxWidth: "600px" }}>
        {userProfile && (
          <Col md={12}>
            <Card className="shadow rounded">
              <Card.Body>
                <Card.Title className="mb-3">👤 User Profile</Card.Title>
                <Row>
                  <Col md={12}>
                    <p>
                      <strong>Full Name:</strong> {userProfile.firstName}{" "}
                      {userProfile.lastName}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <p>
                      <strong>Email:</strong> {userProfile.email}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        )}

        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <Col md={12} key={index} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Address {index + 1} </Card.Title>
                  <Card.Text>
                    <strong>Country:</strong> {address.country} <br />
                    <strong>State:</strong> {address.state} <br />
                    <strong>City:</strong> {address.city} <br />
                    <strong>Street:</strong> {address.street} <br />
                    <strong>Phone:</strong> {address.phone} <br />
                    <strong>Address Type:</strong> {address.addressType} <br />
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEditClick(address)}
                    >
                      ✏️ Update
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteUserAddress(address.id)}
                    >
                      🗑 Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No addresses found.</p>
        )}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={formData.street}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address Type</Form.Label>
              <Form.Control
                as="select"
                name="addressType"
                value={formData.addressType}
                onChange={handleFormChange}
              >
                <option value="HOME">Home</option>
                <option value="OFFICE">Office</option>
                <option value="SHIPPING">Shipping</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateAddress}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserProfile;
