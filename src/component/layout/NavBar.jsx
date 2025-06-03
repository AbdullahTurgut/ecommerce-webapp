import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () => {
  const cart = useSelector((state) => state.cart);
  const userId = 1;
  return (
    <Navbar expand="lg" sticky="top" className="nav-bg">
      <Container>
        <Navbar.Brand to={"/"} as={Link}>
          <span className="shop-home">buyNow.com</span>
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to={"/products"} as={Link}>
              All Products
            </Nav.Link>
          </Nav>

          <Nav className="me-auto">
            <Nav.Link to={"/add-product"} as={Link}>
              Manage Products
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <NavDropdown title="Account">
              <NavDropdown.Item to={"#"} as={Link}>
                My Account
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item to={`/user/${userId}/my-orders`} as={Link}>
                My Orders
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item to={"#"} as={Link}>
                Logout
              </NavDropdown.Item>

              <NavDropdown.Item to={"#"} as={Link}>
                Login
              </NavDropdown.Item>
            </NavDropdown>

            <Link
              to={`/user/${userId}/my-cart`}
              className="nav-link me-1 position-relative"
            >
              <FaShoppingCart className="shopping-cart-icon" />
              {cart.items.length > 0 ? (
                <div className="badge-overlay">{cart.items.length}</div>
              ) : (
                <div className="badge-overlay">0</div>
              )}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
